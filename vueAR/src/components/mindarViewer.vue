<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /targets (41).mind; maxTrack: 4; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
  >
    <a-camera mindar-image-camera></a-camera>

    <a-assets>
      <a-asset-item id="ratModel" src="/rat.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-assets>
      <a-asset-item id="shinyModel" src="/shinyRat.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-entity v-for="(rat, i) in userRats" :key="i" :mindar-image-target="'targetIndex: ' + i">
      <a-gltf-model
        rotation="90 0 0"
        position="0 0 -0.5"
        scale="0.5 0.5 0.5"
        :src="'#' + userRats[i].type + 'Model'"
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
import { onMounted, ref } from 'vue'

const sceneRef = ref(null)
defineExpose({
  sceneRef,
})

const ratModel = ref(null)

onMounted(() => {
  const rat = ratModel.value
  if (rat) {
    rat.addEventListener('model-loaded', () => {
      console.log('Rat model loaded')
    })
  }
})

const userRats = ref([
  { type: 'rat', scale: 2, caught: false },
  { type: 'shiny', scale: 2, caught: false },
])
</script>
