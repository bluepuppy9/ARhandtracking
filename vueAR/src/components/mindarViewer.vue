<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /targets (39).mind; maxTrack: 4; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
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

    <a-entity v-for="i in 3" :key="i" :mindar-image-target="'targetIndex: ' + (i - 1)">
      <a-gltf-model
        rotation="90 0 0"
        position="0 0 0.1"
        scale="0.5 0.5 0.5"
        :src="'#' + UserRats[i - 1].type + 'Model'"
      >
        <a-animation
          attribute="scale"
          dur="1000"
          direction="alternate"
          repeat="indefinite"
          easing="ease-in-out"
          from="0.5 0.5 0.5"
          to="1 1 1"
        ></a-animation>
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

const userRats = ref({
  0: { type: 'rat', scale: 2, caught: false },
  1: { type: 'shiny', scale: 2, caught: false },
  2: { type: 'rat', scale: 1, caught: false },
  3: { type: 'normal', scale: 2, caught: false },
})
</script>
