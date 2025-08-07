<template>
  <TheShopStuff v-if="shopFound"/>
  <TimingMinigame v-if="ratFound" />
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /ratAndStop.mind; maxTrack: 4; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
  >
    <a-assets>
      <a-asset-item id="rat-model" src="/rat.glb" crossorigin></a-asset-item>
      <a-asset-item id="shiny-model" src="/shinyRat.glb" crossorigin></a-asset-item>
      <a-asset-item id="shop-model" src="/shop.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

    <a-entity v-for="(rat, i) in UserRats" :key="i" :mindar-image-target="'targetIndex: ' + i" ref="targets">
      <a-gltf-model
        v-if="rat.type !== 'shop'"
        ref="ratModels"
        rotation="90 0 0"
        position="0 0 0.1"
        scale="0.1 0.1 0.1"
        :src="'#' + rat.type + '-model'"
      >
    </a-gltf-model>
      <a-gltf-model
        v-else-if="rat.type === 'shop'"
        rotation="0 0 0"
        position="0 0 0.1"
        scale="0.1 0.1 0.1"
        :src="'#' + rat.type + '-model'"
      >
      </a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<script setup>
import { onMounted, ref, useTemplateRef, onUnmounted } from 'vue'
import TheShopStuff from './TheShopStuff.vue'
import TimingMinigame from './TimingMinigame.vue'

const shopFound = ref(false)
const targets = useTemplateRef('targets')

onMounted(()=>{
  for (let i = 0; i < UserRats.value.length; i++){
    if (UserRats.value[i].type === 'shop'){
      targets.value[i].addEventListener('targetFound', ()=>{
        shopFound.value = true
      })
      targets.value[i].addEventListener('targetLost', ()=>{
        shopFound.value = false
      })
    }
  }
})


const ratFound = ref(false)

function findingRat(){
  ratFound.value = true
}
function lostRat(){
  ratFound.value = false
}
function findingShop(){
  shopFound.value = true
}
function lostShop(){
  shopFound.value = false
}

onMounted(() => {
  for (let i = 0; i < UserRats.value.length; i++){
    if (UserRats.value[i].type === 'shop'){
      targets.value[i].addEventListener('targetFound', findingShop)
      targets.value[i].addEventListener('targetLost', lostShop)
    }
    else if (UserRats.value[i].type !== 'shop'){
      targets.value[i].addEventListener("targetFound", findingRat)
      targets.value[i].addEventListener("targetLost", lostRat)
    }
  }
})

onUnmounted(() =>{
  for (let i = 0; i < UserRats.value.length; i++){
    if (UserRats.value[i].type === 'shop'){
      targets.value[i].removeEventListener('targetFound', findingShop)
      targets.value[i].removeEventListener('targetLost', lostShop)
    }
    else if (UserRats.value[i].type !== 'shop'){
      targets.value[i].removeEventListener("targetFound", findingRat)
      targets.value[i].removeEventListener("targetLost", lostRat)
    }
  }
})
const sceneRef = useTemplateRef('sceneRef')
defineExpose({
  sceneRef,
})



const UserRats = ref([
  { type: 'rat', scale: 2, caught: false, id: 0 },
  { type: 'shiny', scale: 2, caught: false, id: 1 },
  { type: 'shop', scale: 1, caught: null, id: 2 },
])
</script>

