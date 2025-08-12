<template>
  <div v-show="shopFound" class="sizing">
    <TheShopStuff />
  </div>
  <div v-show="ratFound" class="sizing">
    <TimingMinigame />
  </div>
  <a-scene class="arContainer" ref="sceneRef"
    mindar-image="imageTargetSrc: /test.mind; maxTrack: 4; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
    color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false">
    <a-assets>
      <a-asset-item id="rat-model" src="/rat.glb" crossorigin></a-asset-item>
      <a-asset-item id="shiny-model" src="/shinyRat.glb" crossorigin></a-asset-item>
      <a-asset-item id="shop-model" src="/shop.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
    <a-entity mindar-image-target="targetIndex: 1">
      <a-gltf-model rotation="0 0 0" position="0 0 -1" scale="0.5 0.5 0.5" src="#rat-model"></a-gltf-model>
      <!-- model for testing purposes delete later -->
    </a-entity>

    <a-entity v-for="(rat, i) in UserRats" :key="i" :mindar-image-target="'targetIndex: ' + i" ref="targets">
      <a-gltf-model :rotation="rat.type === 'shop' ? '0 0 0' : '0 0 0'" position="0 0 0.1" scale="0.1 0.1 0.1"
        :src="'#' + rat.type + '-model'">
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
const ratFound = ref(false)

function findingRat() {
  console.log('found rat!')
  ratFound.value = true
  document.querySelector('a-gltf-model').object3D.visible
}
function lostRat() {
  ratFound.value = false
}
function findingShop() {
  shopFound.value = true
}
function lostShop() {
  shopFound.value = false
}

onMounted(() => {
  console.log(sceneRef.value.systems['mindar-image-system'])
  for (let i = 0; i < UserRats.value.length; i++) {
    if (UserRats.value[i].type === 'shop') {
      targets.value[i].addEventListener('targetFound', findingShop)
      targets.value[i].addEventListener('targetLost', lostShop)
    } else if (UserRats.value[i].type !== 'shop') {
      targets.value[i].addEventListener('targetFound', findingRat)
      targets.value[i].addEventListener('targetLost', lostRat)
    }
  }
})

onUnmounted(() => {
  for (let i = 0; i < UserRats.value.length; i++) {
    if (UserRats.value[i].type === 'shop') {
      targets.value[i].removeEventListener('targetFound', findingShop)
      targets.value[i].removeEventListener('targetLost', lostShop)
    } else if (UserRats.value[i].type !== 'shop') {
      targets.value[i].removeEventListener('targetFound', findingRat)
      targets.value[i].removeEventListener('targetLost', lostRat)
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

<style>
.arContainer {
  overflow: hidden;
}

.sizing {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
</style>