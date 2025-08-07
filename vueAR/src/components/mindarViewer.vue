<template>
    <TimingMinigame v-if="ratFound" />
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /targets (41).mind; maxTrack: 4; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
  >
    <a-assets>
      <a-asset-item id="avatar-model" src="/rat.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-assets>
      <a-asset-item id="shiny-model" src="/shinyRat.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

    <a-entity v-for="(rat, i) in UserRats" :key="i" :mindar-image-target="'targetIndex: ' + i" ref="targets">
      <a-gltf-model
        ref="ratModels"
        rotation="90 0 0"
        position="0 0 0.1"
        scale="0.1 0.1 0.1"
        :src="'#' + rat.type + '-model'"
      >
      </a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<script setup>
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import TimingMinigame from './TimingMinigame.vue'

const ratFound = ref(false)
const targets = useTemplateRef('targets')

function findingRat(){
  ratFound.value = true
}
function lostRat(){
  ratFound.value = false
}

onMounted(() => {
  const targetElements = targets.value;
  targetElements.forEach((target) => {
    target.addEventListener("targetFound", findingRat)
    target.addEventListener("targetLost", lostRat)
  })
})

onUnmounted(() =>{
  const targets = targets.value;
  targets.forEach((target) => {
    target.removeEventListener("targetFound", findingRat)
    target.removeEventListener("targetLost", lostRat)
  })
})
const sceneRef = useTemplateRef('sceneRef')
defineExpose({
  sceneRef,
})

const UserRats = ref([
  { type: 'rat', scale: 2, caught: false, id: 0 },
  { type: 'shiny', scale: 2, caught: false, id: 1 },
])
</script>

