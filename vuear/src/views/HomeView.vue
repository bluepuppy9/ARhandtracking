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
        <a-asset-item id="duckModel" src="./Duck.glb"></a-asset-item>
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
          position="0 0 0.1"
          :scale="isMobile ? '0.04 0.04 0.04' : '0.05 0.05 0.05'"
          class="clickable"
          geometry="primitive: box; width: 0.4; height: 0.4; depth: 0.4"
          material="transparent: true; opacity: 0.01"
          animation__click="property: scale; startEvents: click; to: 0 0 0; dur: 300; easing: easeOutBack"
          animation__idle="property: rotation; to: 0 360 0; loop: true; dur: 8000"
        ></a-entity>
      </a-entity>
    </a-scene>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

let score = 0;
let duckVisible = true;
const isMobile = window.innerWidth <= 768;

onMounted(() => {
  console.log("Script loaded");

  const scoreDisplay = document.getElementById("score");
  const sceneEl = document.querySelector("a-scene");

  if (sceneEl) {
    sceneEl.addEventListener("renderstart", () => console.log("Scene render started"));
    sceneEl.addEventListener("arReady", () => console.log("AR Ready"));
    sceneEl.addEventListener("arError", (event) => console.log("AR Error:", event.detail));
    sceneEl.addEventListener("loaded", () => setupDuckEvents(scoreDisplay));
  }

  function setupDuckEvents(display: HTMLElement | null) {
    const duck = document.querySelector("#duck");

    if (duck) {
      duck.addEventListener("click", (e) => {
        shootDuck(display);
        e.stopPropagation();
      });

      duck.addEventListener("touchstart", (e) => {
        shootDuck(display);
        e.preventDefault();
        e.stopPropagation();
      });

      duck.addEventListener("fused", () => shootDuck(display));

      duck.addEventListener("mouseenter", () => {
        duck.setAttribute("material", "color: red; opacity: 0.3");
      });

      duck.addEventListener("mouseleave", () => {
        duck.setAttribute("material", "transparent: true; opacity: 0.01");
      });
    }

    sceneEl?.addEventListener("click", () => shootDuck(display));
  }

  function shootDuck(display: HTMLElement | null) {
    if (!duckVisible) return;

    duckVisible = false;
    score++;
    if (display) display.textContent = `Score: ${score}`;

    const duck = document.querySelector("#duck");
    duck?.setAttribute("animation__click", "property: scale; to: 0 0 0; dur: 300; easing: easeOutBack");

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
