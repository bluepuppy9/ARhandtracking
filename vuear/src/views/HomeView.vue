<template>
  <div id="score">Score: 0</div>

  <div class="example-container">
    <a-scene
      embedded
      style="width: 100vw; height: 100vh;"
      mindar-image="imageTargetSrc: ./targets.mind; autoStart: true; uiLoading: yes; uiScanning: yes; uiError: yes;"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: true">

      <a-assets>
        <a-asset-item id="duckModel" src="../../public/Duck.glb"></a-asset-item>
        <audio id="hitSound" src="./quack.mp3"></audio>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false" wasd-controls="enabled: false">
        <a-entity
          id="cursor"
          cursor="fuse: true; fuseTimeout: 1500"
          raycaster="objects: .clickable; far: 10; near: 0.1"
          geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.015"
          material="color: white; opacity: 0.9"
          position="0 0 -0.3"
        ></a-entity>
      </a-camera>

      <a-entity mindar-image-target="targetIndex: 0">
        <a-entity
          id="duck"
          gltf-model="#duckModel"
          position="0 0 -0.5"
          class="clickable"
          geometry="primitive: box; width: 0.4; height: 0.4; depth: 0.4"
          material="transparent: true; opacity: 0.01"
          animation__click="property: scale; startEvents: click; to: 0 0 0; dur: 300; easing: easeOutBack"
          animation__idle="property: rotation; to: 0 360 0; loop: true; dur: 8000"
        ></a-entity>

        <a-entity id="hitText" position="0 0.3 -0.5" text="value: +1; color: yellow; align: center; opacity: 0;" visible="false"></a-entity>
        <a-sound id="quackSound" src="#hitSound" autoplay="false" on="click"></a-sound>
      </a-entity>
    </a-scene>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

let score = 0;
let duckVisible = true;
const isMobile = window.innerWidth <= 768;

onMounted(() => {
  const scoreDisplay = document.getElementById("score");
  const duck = document.querySelector("#duck");
  const hitText = document.querySelector("#hitText");
  const quackSound = document.querySelector("#quackSound") as any;

  if (duck) {
    duck.setAttribute("scale", isMobile ? "0.04 0.04 0.04" : "0.05 0.05 0.05");
  }

  duck?.addEventListener("click", (e) => {
    shootDuck(scoreDisplay);
    e.stopPropagation();
  });

  duck?.addEventListener("touchstart", (e) => {
    shootDuck(scoreDisplay);
    e.preventDefault();
    e.stopPropagation();
  });

  duck?.addEventListener("fused", () => shootDuck(scoreDisplay));

  duck?.addEventListener("mouseenter", () => {
    duck.setAttribute("material", "color: red; opacity: 0.3");
  });

  duck?.addEventListener("mouseleave", () => {
    duck.setAttribute("material", "transparent: true; opacity: 0.01");
  });

  function shootDuck(display: HTMLElement | null) {
    if (!duckVisible) return;

    duckVisible = false;
    score++;
    if (display) display.textContent = `Score: ${score}`;

    duck?.setAttribute("animation__click", "property: scale; to: 0 0 0; dur: 300; easing: easeOutBack");

    quackSound?.components.sound?.playSound?.();

    if (hitText) {
      hitText.setAttribute("visible", "true");
      hitText.setAttribute("text", "opacity: 1");
      setTimeout(() => {
        hitText.setAttribute("text", "opacity: 0");
        hitText.setAttribute("visible", "false");
      }, 800);
    }

    // Reset duck after delay
    setTimeout(() => {
      duck?.setAttribute("scale", isMobile ? "0.04 0.04 0.04" : "0.05 0.05 0.05");
      duck?.removeAttribute("animation__click");
      duckVisible = true;
    }, 2000);
  }
});
</script>


<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.example-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

#score {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 1.2rem;
  color: white;
  z-index: 999;
}
</style>
