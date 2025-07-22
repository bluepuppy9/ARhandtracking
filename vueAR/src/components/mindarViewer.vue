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

    <a-entity v-for="i in 4" :key="i" :mindar-image-target="'targetIndex: ' + (i - 1)">
      <a-gltf-model rotation="90 0 0" position="0 0 0.1" scale="0.5 0.5 0.5" src="#avatarModel" class="clickable" ref="ratModel">
      </a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TimingGame from './TimingGame.vue';
//Functions to hopefully start the minigame
const ratModel = ref(null)

onMounted(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const rat = ratModel.value
    if (rat) {
      rat.addEventListener("click", () =>{
        console.log("Rat clicked!")

        //start minigame in here or spawn it after the rat is clicked

      })
    }
  })
})


//scene stuff
const sceneRef = ref(null)
defineExpose({
  sceneRef,
})
</script>
