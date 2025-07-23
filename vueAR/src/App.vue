<template>
  <div class="app">
    <div>
      <button @click="handleARSystems()">{{ title }}</button>
    </div>

    <div v-show="started" class="container">
      <mindar-viewer ref="mindarViewerRef" />
    </div>
    <RouterView v-show="!started" />
  </div>
</template>

<script setup>
import './libs/mindar/mindar-image.prod.js'
import 'aframe'
import './libs/mindar/mindar-image-aframe.prod.js'
import MindarViewer from './components/mindarViewer.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const mindarViewerRef = ref(null)
const title = ref('START')

function handleARSystems() {
  const sceneEl = mindarViewerRef.value.sceneRef
  const arSystem = sceneEl.systems['mindar-image-system']
  started.value = !started.value
  if (title.value == 'START') {
    arSystem.start()
    title.value = 'STOP'
  } else {
    arSystem.stop()
    title.value = 'START'
  }
}

const started = ref(false)
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
</style>
