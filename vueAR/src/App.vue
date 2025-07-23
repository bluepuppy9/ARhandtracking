<template>
  <div class="app">
    <div>
      <button @click="handleARSystems()">{{ title }}</button>
    </div>

    <div class="container">
      <mindar-viewer ref="mindarViewerRef" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="zoom"
        class="zoom-slider"
        @input="handleZoom"
      />
    </div>
  </div>
</template>


<script setup>
import './libs/mindar/mindar-image.prod.js'
import 'aframe'
import './libs/mindar/mindar-image-aframe.prod.js'
import MindarViewer from './components/mindarViewer.vue'
import { ref, onMounted } from 'vue'

const mindarViewerRef = ref(null)
const title = ref('START')
const zoom = ref(0.3) 

function handleARSystems() {
  const sceneEl = mindarViewerRef.value.sceneRef
  const arSystem = sceneEl.systems['mindar-image-system']
  if (title.value == 'START') {
    arSystem.start()
    title.value = 'STOP'
  } else {
    arSystem.stop()
    title.value = 'START'
  }
}

function handleZoom() {
  const sceneEl = mindarViewerRef.value.sceneRef
  const threeCamera = sceneEl.camera
  if (threeCamera && 'fov' in threeCamera) {
    threeCamera.fov = 75 - parseFloat(zoom.value) * 40 
    threeCamera.updateProjectionMatrix()
  }
}


onMounted(() => {
  handleZoom()
})

</script>

<style scoped>
.app {
  text-align: center;
}

.container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.zoom-slider {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: rotate(270deg) translateY(-50%);
  transform-origin: right center;
  width: 150px;
  height: 30px;
  z-index: 10;
}
</style>
