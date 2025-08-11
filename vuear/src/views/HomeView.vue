<template>
  <div class="main">
    <signup v-if="!isLoggedIn" />

    <div v-if="isLoggedIn">
      <div class="containerMindar" :class="{ visible: running }">
        <mindar-viewer ref="mindarViewerRef" />
      </div>

      <div class="container start-text">
        <div v-if="!running">
          <h1>Welcome to the AR Ratdom</h1>
          <p>Scan the QR code to start the AR experience.</p>
        </div>

        <button class="startButton" :class="{ active: running }" @click="toggleARVisibility">
          {{ running ? 'STOP' : 'START' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import signup from '../components/signup.vue'
import '../libs/mindar/mindar-image.prod.js'
import 'aframe'
import '../libs/mindar/mindar-image-aframe.prod.js'
import MindarViewer from '../components/mindarViewer.vue'
import { useUserStore } from '../stores/userStore'

const mindarViewerRef = ref(null)
const running = ref(false)
const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)

onMounted(() => {
  setTimeout(() => {
    const sceneEl = mindarViewerRef.value?.sceneRef
    if (sceneEl) {
      const arSystem = sceneEl.systems['mindar-image-system']
      if (arSystem && !arSystem.isStarted) {
        arSystem.start()
        console.log('MindAR system pre-started in background')
      }
    }
  }, 500)
})

function toggleARVisibility() {
  running.value = !running.value
}
</script>

<style scoped>
.containerMindar {
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
}

.containerMindar.visible {
  opacity: 1;
  pointer-events: auto;
}

.startButton {
  padding: 0.75rem;
  background: var(--primary);
  color: var(--secondary);
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    transform 0.5s ease,
    top 0.5s ease;
  box-shadow: 0 0 10px var(--primary);
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.startButton.active {
  top: 1%;
  transform: translate(-50%, 0);
}
</style>
