<template>
  <div v-show="!shopFound && (!ratFound || inventory.ratNets === 0)">
    <TheBottomBar />
  </div>
  <div v-show="shopFound">
    <TheShopStuff />
  </div>
  <div v-show="ratFound">
    <TimingMinigame />
  </div>
  <a-scene
    class="arContainer"
    ref="sceneRef"
    mindar-image="imageTargetSrc: /ratAndStop.mind; maxTrack: 4; autoStart: true; uiLoading: no; uiError: no; uiScanning: no; filterMinCF: 0.0001; filterBeta: 1000; warmupTolerance: 5; missTolerance: 5;"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
    camera="active: true"
  >
    <a-assets>
      <a-asset-item id="rat-model" src="/rat.glb" crossorigin></a-asset-item>
      <a-asset-item id="shiny-model" src="/shinyRat.glb" crossorigin></a-asset-item>
      <a-asset-item id="shop-model" src="/shop.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
    <a-entity
      v-for="(rat, i) in UserRats"
      :key="i"
      :mindar-image-target="'targetIndex: ' + i"
      visible="false"
    >
      <a-gltf-model
        :rotation="rat.type === 'shop' ? '0 270 0' : '0 0 0'"
        position="0 0 0.1"
        ref="ratModels"
        :scale="rat.type === 'shop' ? '0.05 0.05 0.05' : '0.1 0.1 0.1'"
        :src="'#' + rat.type + '-model'"
      >
      </a-gltf-model>
      <!-- very jitterly :3 idk why -->
    </a-entity>
  </a-scene>
</template>

<script setup>
import { ref, useTemplateRef, onUnmounted, onMounted, nextTick } from 'vue'
import TheShopStuff from './TheShopStuff.vue'
import TimingMinigame from './TimingMinigame.vue'
import TheBottomBar from './TheBottomBar.vue'
import { useInventoryStore } from '@/stores/inventory'
const inventory = useInventoryStore()
const shopFound = ref(false)
const ratFound = ref(false)

const sceneRef = useTemplateRef('sceneRef')

const targetsFound = ref(new Set())
function handleTargetFound(event) {
  console.log('Target found event:', event)
  try {
    const targetAttr = event.target.getAttribute('mindar-image-target')
    console.log('Target attribute:', targetAttr)
    let targetIndex
    if (targetAttr && typeof targetAttr === 'string' && targetAttr.includes(': ')) {
      targetIndex = targetAttr.split(': ')[1]
    } else {
      targetIndex =
        event.detail?.targetIndex ??
        Array.from(event.target.parentNode.children).indexOf(event.target)
    }

    console.log(`Target ${targetIndex} found`)
    targetsFound.value.add(parseInt(targetIndex))
    event.target.setAttribute('visible', true)
    if (UserRats.value[parseInt(targetIndex) - 2].type === 'shop') {
      shopFound.value = true
    } else if (UserRats.value[parseInt(targetIndex) - 2].type === 'rat') {
      ratFound.value = true
    }
  } catch (error) {
    console.error('Error in handleTargetFound:', error)
  }
}

function handleTargetLost(event) {
  console.log('Target lost event:', event)
  try {
    const targetAttr = event.target.getAttribute('mindar-image-target')
    console.log('Target attribute:', targetAttr)

    let targetIndex
    if (targetAttr && typeof targetAttr === 'string' && targetAttr.includes(': ')) {
      targetIndex = targetAttr.split(': ')[1]
    } else {
      targetIndex =
        event.detail?.targetIndex ??
        Array.from(event.target.parentNode.children).indexOf(event.target)
    }

    console.log(`Target ${targetIndex} lost`)
    targetsFound.value.delete(parseInt(targetIndex))
    event.target.setAttribute('visible', false)
    if (UserRats.value[parseInt(targetIndex) - 2].type === 'shop') {
      //unsure of -2 works if targetIndex expanded, might need to change so it properly reflects the targetindex in the future
      shopFound.value = false
    } else if (UserRats.value[parseInt(targetIndex) - 2].type === 'rat') {
      ratFound.value = false
    }
  } catch (error) {
    console.error('Error in handleTargetLost:', error)
  }
}

onMounted(async () => {
  await nextTick()
  if (sceneRef.value) {
    sceneRef.value.addEventListener('loaded', async () => {
      console.log('Scene loaded successfully')

      const targetElements = sceneRef.value.querySelectorAll('[mindar-image-target]')
      console.log(`Found ${targetElements.length} target elements`)

      targetElements.forEach((target, index) => {
        target.setAttribute('visible', false)

        target.addEventListener('targetFound', handleTargetFound)
        target.addEventListener('targetLost', handleTargetLost)

        console.log(`Set up listeners for target ${index}`)
      })
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )

      if (isMobile) {
        console.log('Mobile device detected - applying mobile optimizations')

        setTimeout(async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: {
                facingMode: 'environment',
                width: { ideal: 640, max: 1280 },
                height: { ideal: 480, max: 720 },
                frameRate: { ideal: 30, max: 30 },
              },
            })

            stream.getTracks().forEach((track) => track.stop())
            console.log('Mobile camera permission granted')

            const mindARSystem = sceneRef.value.systems['mindar-image-system']
            if (mindARSystem) {
              console.log('Reinitializing MindAR for mobile')
              await mindARSystem.start()
            }

            const canvas = sceneRef.value.canvas
            if (canvas) {
              const rect = canvas.getBoundingClientRect()
              canvas.style.width = '100%'
              canvas.style.height = '100%'

              if (sceneRef.value.renderer) {
                sceneRef.value.renderer.setSize(rect.width, rect.height, false)
              }

              const touchEvent = new TouchEvent('touchstart', {
                bubbles: true,
                cancelable: true,
                touches: [
                  new Touch({
                    identifier: 0,
                    target: canvas,
                    clientX: canvas.width / 2,
                    clientY: canvas.height / 2,
                  }),
                ],
              })
              canvas.dispatchEvent(touchEvent)
            }
          } catch (error) {
            console.error('Mobile camera setup failed:', error)
            setTimeout(() => {
              window.dispatchEvent(new Event('resize'))
            }, 1000)
          }
        }, 2000)
      }
    })

    sceneRef.value.addEventListener('arError', (event) => {
      console.error('AR Error:', event.detail)
    })
  }
})

onUnmounted(() => {
  if (sceneRef.value) {
    const targetElements = sceneRef.value.querySelectorAll('[mindar-image-target]')
    targetElements.forEach((target) => {
      target.removeEventListener('targetFound', handleTargetFound)
      target.removeEventListener('targetLost', handleTargetLost)
    })
  }
})

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
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  touch-action: none !important;
  overscroll-behavior: none !important;
  -webkit-overflow-scrolling: none !important;
}

.arContainer,
a-scene {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  overflow: hidden !important;
  touch-action: none !important;
  overscroll-behavior: none !important;
  user-select: none !important;
  z-index: 900;
}

.arContainer {
  user-select: none !important;
  touch-action: none !important;
  overscroll-behavior: none !important;
}
</style>
