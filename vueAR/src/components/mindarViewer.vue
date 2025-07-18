<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /targetsXS.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no; filterMinCF:0.0001; filterBeta: 0.001;"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights : true; precision: high;"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
  >
    <a-assets>
      <a-asset-item id="avatarModel" src="/rat.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-camera
      mindar-camera
      video="width: 1920; height: 1080;"
      position="0 0 0"
      look-controls="enabled: false"
    ></a-camera>

    <a-entity mindar-image-target="targetIndex: 0">
      <a-gltf-model rotation="90 0 0" position="0 0 0.1" scale="0.5 0.5 0.5" src="#avatarModel">
      </a-gltf-model>
      <a-sphere radius="0.01" color="red" scale="20 20 20"></a-sphere>
    </a-entity>
  </a-scene>
</template>

<script setup>
import { ref } from 'vue'

const sceneRef = ref(null)
defineExpose({
  sceneRef,
})
</script>
