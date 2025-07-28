<template>
  <div v-if="ratFound" id="timingMinigame">
    <TimingMinigame/>
  </div>
  <a-scene
    ref="sceneRef"
    id="mindarScene"
    mindar-image="imageTargetSrc: /bigRats.mind; maxTrack: 2; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
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
    <a-entity 
      v-for="i in 2" 
      :key="i" :mindar-image-target="'targetIndex: ' + (i - 1)"
      ref="targets">
      <a-gltf-model 
        class="clickable"
        ref="ratModels"
        @model-loaded="e => console.log('✅ Model loaded!', e)"
        scale="1 1 1"
        position="0 0 -0.5"
        rotation="0 0 0"
        src="#avatarModel">
      </a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import TimingMinigame from './TimingMinigame.vue'

//references

//game bools
const ratFound = ref(false)
const targets = useTemplateRef('targets')
const ratModels = useTemplateRef('ratModels')

//adding event listeners to stuff
onMounted(() => {
  const targetElements = targets.value;
  targetElements.forEach((target) => {
      target.addEventListener("targetFound", () => {
        console.log("Target is found!")
        ratFound.value = true;
    })
  })
  const ratElements = ratModels.value;
  ratElements.forEach((rat) => {
    rat.addEventListener("targetFound", () =>{
      console.log("We found a rat!")
    })
  })
})


const sceneRef = useTemplateRef('sceneRef')
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