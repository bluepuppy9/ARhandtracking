<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /targets (42).mind; maxTrack: 4; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
  >
    <a-assets>
      <a-asset-item id="ratModel" src="/rat.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-assets>
      <a-asset-item id="shinyModel" src="/shinyRat.glb" crossorigin></a-asset-item>
    </a-assets>
    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

    <a-entity v-for="(rat, i) in UserRats" :key="i" :mindar-image-target="'targetIndex: ' + i">
      <a-gltf-model
        rotation="90 0 0"
        position="0 0 0.1"
        scale="0.5 0.5 0.5"
        :src="'#' + rat.type + 'Model'"
      >
      </a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<script setup>
import { ref } from 'vue'

const sceneRef = ref(null)
defineExpose({
  sceneRef,
})

const UserRats = ref([
  { type: 'rat', scale: 2, caught: false, id: 0 },
  { type: 'shiny', scale: 2, caught: false, id: 1 },
])
</script>
