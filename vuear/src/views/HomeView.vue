<template>
  <div class="main">
    <signup v-if="!isLoggedIn" />
    <button @click="handleARSystems()">{{ title }}</button>

    <div class="container">
      <mindar-viewer ref="mindarViewerRef" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import login from '../components/login.vue'
import signup from '../components/signup.vue'
import '../libs/mindar/mindar-image.prod.js'
import 'aframe'
import '../libs/mindar/mindar-image-aframe.prod.js'
import MindarViewer from '../components/mindarViewer.vue'
import { useUserStore } from '../stores/userStore'
const mindarViewerRef = ref(null)
const title = ref('START')
const userStore = useUserStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)

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
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
