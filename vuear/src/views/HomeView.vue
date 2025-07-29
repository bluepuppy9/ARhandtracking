<template>
  <div class="main">
    <login v-if="!isLoggedIn" />
    
    <div v-if="isLoggedIn">
      <button v-if="!showViewer" @click="showViewer = true" style="margin-bottom: 16px;">
        Show AR Viewer
      </button>

      <div v-if="showViewer">
        <button @click="handleARSystems()">{{ title }}</button>

        <div class="container">
          <mindar-viewer ref="mindarViewerRef" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import login from '../components/login.vue'
import MindarViewer from '../components/mindarViewer.vue'
import { useUserStore } from '../stores/userStore'

import '../libs/mindar/mindar-image.prod.js'
import 'aframe'
import '../libs/mindar/mindar-image-aframe.prod.js'

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)

const showViewer = ref(false)
const mindarViewerRef = ref(null)
const title = ref('START')

function handleARSystems() {
  const sceneEl = mindarViewerRef.value.sceneRef
  const arSystem = sceneEl.systems['mindar-image-system']
  if (title.value === 'START') {
    arSystem.start()
    title.value = 'STOP'
  } else {
    arSystem.stop()
    title.value = 'START'
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
