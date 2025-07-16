<script setup>
  import './libs/mindar/mindar-image.prod.js'
  import 'aframe'
  import './libs/mindar/mindar-image-aframe.prod.js'
  import MindarViewer from './components/mindarViewer.vue'
  import { ref } from 'vue'

  const mindarViewerRef = ref(null)
  const title = ref('START')

  function handleARSystems() {    
    const sceneEl = mindarViewerRef.value.sceneRef
    const arSystem = sceneEl.systems['mindar-image-system']
    if(title.value == 'START') {
      arSystem.start()
      title.value = 'STOP'
    } else {
      arSystem.stop()
      title.value = 'START'
    }

  }
</script>

<template>
  <div class="app">
    <div>
      <button @click="handleARSystems()">{{ title }}</button>
    </div>

    <div class="container">
      <mindar-viewer ref="mindarViewerRef" />
    </div>
  </div>
</template>

<style scoped>
.app {
  text-align: center;
}

.container {
  margin: 20px auto;
  position: relative;
  height: 400px;
  width: 600px;
  overflow: hidden;
}
</style>
