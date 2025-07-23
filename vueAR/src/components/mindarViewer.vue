<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /targets (33).mind; maxTrack: 4; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
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
      v-for="i in 4" 
      :key="i" :mindar-image-target="'targetIndex: ' + (i - 1)">
      <a-gltf-model 
        class="clickable"
        ref="ratModels"
        rotation="90 0 0" 
        position="0 0 0.1" 
        scale="0.5 0.5 0.5"
        src="#avatarModel">
      </a-gltf-model>
    </a-entity>
  </a-scene>
  <div>
    <TimingMinigame v-if="ratFound" />
  </div>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import TimingMinigame from './TimingMinigame.vue'

//RatModel reference here
const ratModels = ref([])
const ratFound = ref(false)

onMounted(() =>{
  window.addEventListener("DOMContentLoaded", ()=> {
    const rats = ratModels.value;
    if (rats){
      rats.forEach(rat, ()=>{
        rat.addEventListener("targetFound", () => {
          ratFound.value = true
          console.log("Rat found!")
        })
      })
    }
  })
})

const sceneRef = ref(null)
defineExpose({
  sceneRef,
})

const UserRats = ref({
  0: { type: 'normal', scale: 2, caught: false },
  1: { type: 'party', scale: 2, caught: false },
  2: { type: 'party2', scale: 1, caught: false },
  3: { type: 'normal', scale: 2, caught: false },
})
</script>
