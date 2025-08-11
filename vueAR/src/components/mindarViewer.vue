<template>
  <div class="camera-wrapper">
    <a-scene ref="sceneRef"
      mindar-image="imageTargetSrc: /empty.mind; maxTrack: 4; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
      color-space="sRGB" embedded renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false">

      <a-assets>
        <a-asset-item id="rat-model" src="/rat.glb" crossorigin></a-asset-item>
        <a-asset-item id="shiny-model" src="/shinyRat.glb" crossorigin></a-asset-item>
      </a-assets>

      <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

      <a-entity v-for="(rat, i) in UserRats" :key="i" :mindar-image-target="'targetIndex: ' + i" ref="targets">
        <a-gltf-model rotation="90 0 0" position="0 0 0.1" scale="0.1 0.1 0.1" :src="'#' + rat.type + '-model'" />
      </a-entity>
    </a-scene>

    <div v-if="qrActive" class="qr-overlay">
      <div class="scan-box"></div>
    </div>

    <TimingMinigame v-if="ratFound && !qrActive" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, useTemplateRef, nextTick } from 'vue'
import QRScanner from 'qr-scanner'
import TimingMinigame from './TimingMinigame.vue'

const ratFound = ref(false)
const mindFile = ref(null)
const qrActive = ref(true)

const targets = useTemplateRef('targets')
const sceneRef = useTemplateRef('sceneRef')

const UserRats = ref([
  { type: 'rat', scale: 2, caught: false, id: 0 },
  { type: 'shiny', scale: 2, caught: false, id: 1 },
])

function findingRat() { ratFound.value = true }
function lostRat() { ratFound.value = false }

let qrScanner = null
let sceneEl = null

onMounted(async () => {
  await nextTick()
  sceneEl = sceneRef.value

  const videoEl = await waitForVideo(sceneEl)

  qrScanner = new QRScanner(videoEl, result => {
    console.log('QR Code found:', result)
    if (result.endsWith('.mind')) {
      loadMindFile(result)
    } else {
      console.warn('Scanned QR is not a .mind file:', result)
    }
  }, { returnDetailedScanResult: true })

  qrScanner.start()
})

async function waitForVideo(sceneEl) {
  return new Promise(resolve => {
    const check = () => {
      const vid = sceneEl?.querySelector('video')
      if (vid && vid.readyState >= 2) {
        resolve(vid)
      } else {
        requestAnimationFrame(check)
      }
    }
    check()
  })
}

function loadMindFile(url) {
  mindFile.value = url
  qrActive.value = false
  qrScanner.stop()

  const arSystem = sceneEl.systems['mindar-image-system']
  sceneEl.setAttribute('mindar-image', `imageTargetSrc: ${url}; maxTrack: 4; autoStart: true; uiLoading: no; uiError: no; uiScanning: no;`)
  arSystem.start()

  initMindARListeners()
}

function initMindARListeners() {
  setTimeout(() => {
    const targetElements = targets.value || []
    targetElements.forEach(target => {
      target.addEventListener('targetFound', findingRat)
      target.addEventListener('targetLost', lostRat)
    })
  }, 500)
}

onUnmounted(() => {
  if (qrScanner) qrScanner.stop()
  const targetElements = targets.value || []
  targetElements.forEach(target => {
    target.removeEventListener('targetFound', findingRat)
    target.removeEventListener('targetLost', lostRat)
  })
})
</script>

<style scoped>
.camera-wrapper {
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
}

.qr-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.scan-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  border: 4px solid lime;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {

  0%,
  100% {
    border-color: lime;
  }

  50% {
    border-color: transparent;
  }
}
</style>
