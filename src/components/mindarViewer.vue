<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /targets (41).mind; maxTrack: 4; autoStart: true; uiLoading: no; uiError: no; uiScanning: no; filterMinCF: 0.0001; filterBeta: 0.001; warmupTolerance: 5; missTolerance: 5;"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
    camera="active: true"
  >
    <a-assets>
      <a-asset-item id="avatarModel" src="/rat.glb" crossorigin></a-asset-item>
    </a-assets>

    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

    <a-entity
      v-for="i in 1"
      :key="i"
      :mindar-image-target="'targetIndex: ' + (i - 1)"
      visible="false"
    >
      <a-gltf-model rotation="90 0 0" position="0 0 0.1" scale="0.3 0.3 0.3" src="#avatarModel">
      </a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const sceneRef = ref(null)

// Track which targets are found
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

const UserRats = ref({
  0: { type: 'normal', scale: 2, caught: false },
  1: { type: 'party', scale: 2, caught: false },
  2: { type: 'party2', scale: 1, caught: false },
  3: { type: 'normal', scale: 2, caught: false },
})
</script>
