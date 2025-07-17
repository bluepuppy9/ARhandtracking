<script setup>
import { ref, defineExpose } from 'vue'

const sceneRef = ref(null)
defineExpose({ sceneRef })

function handleModelClick(event) {
  console.log('Model clicked!'); // Log to confirm the click event
  const clickedEl = event.target; // Get the clicked element
  clickedEl.setAttribute('scale', '0.05 0.05 0.05'); // Shrink the model
}
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
      cursor="rayOrigin: mouse;"
      raycaster="objects: .clickable" 
      look-controls="enabled: false">
    </a-camera>

    <a-entity mindar-image-target="targetIndex: 0">
      <a-gltf-model
        class="clickable"
        @click="handleModelClick"
        ref="ratModel"
        rotation="0 0 0"
        position="0 0 0.1"
        scale="1 1 1"
        src="#avatarModel"
        animation="property: rotation; to: 0 360 0; dur: 1000; easing: linear; loop: true;"
      ></a-gltf-model>
    </a-entity>
  </a-scene>
</template>