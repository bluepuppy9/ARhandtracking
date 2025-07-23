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
      <a-gltf-model rotation="90 0 0" position="0 0 0.1" scale="0.5 0.5 0.5" src="#avatarModel" class="clickable" :ref="ratModel.push(i)">  
      </a-gltf-model>
    </a-entity>
    <TimingMinigame v-if="ratFound === true"/>
  </a-scene>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TimingMinigame from './TimingMinigame.vue';


const ratFound = ref(false)
const ratModel = ref([])

onMounted(()=> {
  if (ratModel){
    ratModel.value.forEach((model) => {
      model.addEventListener("click", ()=>{
        console.log("You clicked a rat!")
        model.setAttribute("scale", "2 2 2")
        ratFound.value = true
      })
    })
  }
})



const sceneRef = ref(null)

defineExpose({
  sceneRef,
})

const rats = ref({})
</script>
