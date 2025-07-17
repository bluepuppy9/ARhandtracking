<script setup>
import { ref, defineExpose } from 'vue'

const sceneRef = ref(null)
defineExpose({ sceneRef })

function handleModelClick() {
  console.log('Model clicked!'); // Log to confirm the click event
  const clickedEl = ratModel.value;
  clickedEl.setAttribute('scale', '0.1 0.1 0.1'); // Shrink the model
}

AFRAME.registerComponent('change-color-on-hover', {
    schema: {
      color: {default: 'red'}
    },

    init: function () {
      var data = this.data;
      var el = this.el;  // <a-box>

      el.addEventListener('click', function () {
        el.setAttribute('color', data.color);
      });
    }
  });

</script>

<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /targetsRAT.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" 
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
  >
    <a-assets>
      <a-asset-item
        id="avatarModel"
        src="/rat.glb"
        crossorigin
      ></a-asset-item>
    </a-assets>

<a-camera 
  position="0 0 0"
  cursor="rayOrigin: mouse; fuse: false;"
  raycaster="objects: .clickable; interval: 50; near: 0.1; far: 100;"
  look-controls="enabled: false">
</a-camera>

    <a-entity mindar-image-target="targetIndex: 0">
      
      <a-gltf-model
        @click="handleModelClick()"
        class="clickable"
        ref="ratModel"
        rotation="0 0 0"
        position="0 0 -1"
        scale="1 1 1"
        src="#avatarModel"
        animation="property: rotation; to: 0 360 0; dur: 1000; easing: linear; loop: true;"
      >
    </a-gltf-model>
    <a-box
        position="0 0 -2"
        scale=".5 .5 .5"
        opacity="0"
        class="clickable"
        color="red"
        change-color-on-hover="color: blue"
      ></a-box>
    </a-entity>
  </a-scene>
</template>