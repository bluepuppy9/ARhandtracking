<template>
  <div v-if="ratFound">
    <TimingMinigame />
  </div>
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
      <a-asset-item id="avatarModel" src="/rat.glb" crossorigin></a-asset-item>
    </a-assets>
    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

    <a-entity v-for="(rat, i) in UserRats" :key="i" :mindar-image-target="'targetIndex: ' + i" ref="targets">
      <a-gltf-model
        ref="ratModels"
        rotation="90 0 0"
        position="0 0 0.1"
        scale="0.1 0.1 0.1"
        :src="'#' + rat.type + 'Model'"
      >
      </a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import TimingMinigame from './TimingMinigame.vue'

const ratFound = ref(false)
const targets = useTemplateRef('targets')

onMounted(() => {
  const targetElements = targets.value;
  targetElements.forEach((target) => {
      target.addEventListener("targetFound", () => {
        console.log("Target is found!")
        ratFound.value = true
    })
    target.addEventListener("targetLost", () => {
      console.log("Target is lost!")
      ratFound.value = false;
    })
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
