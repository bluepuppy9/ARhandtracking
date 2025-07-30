<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /ratstop.mind; maxTrack: 4; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
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

    <a-entity v-for="i in 3" :key="i" :mindar-image-target="'targetIndex: ' + (i - 1)" ref="targets">
      <a-gltf-model rotation="90 0 0" position="0 0 0.1" scale="0.5 0.5 0.5" src="#ratModel">
      </a-gltf-model>
    </a-entity>
    <a-entity :mindar-image-target="'targetIndex: 2'">
      <a-gltf-model rotation="90 0 0" position="0 0 0.1" scale="0.3 0.3 0.3" src="#shinyModel">
      </a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'

const targets = useTemplateRef('targets')

const sceneRef = ref(null)
defineExpose({
  sceneRef,
})

onMounted(()=>{
  targets.value[3].addEventListener('targetFound', ()=> {
    //spawn items here
  })
})


const UserRats = ref({
  0: { type: 'normal', scale: 2, caught: false },
  1: { type: 'party', scale: 2, caught: false },
  2: { type: 'shiny', scale: 1, caught: false },
  3: { type: 'normal', scale: 2, caught: false },
})
</script>
