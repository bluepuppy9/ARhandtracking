<template>
  <div class="main">
    <signup v-if="!isLoggedIn" />
    <div v-if="isLoggedIn">
      <div class="containerMindar" v-show="running">
        <mindar-viewer ref="mindarViewerRef" />
      </div>
      <div class="container start-text">
        <div v-if="!running">
          <h1>Welcome to the AR Ratdom</h1>
          <p>Please start the AR system to see the rats.</p>
        </div>
        <button class="startButton" :class="{ active: running }" @click="handleARSystems()">
          {{ running ? 'STOP' : 'START' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
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

function handleARSystems() {
  const sceneEl = mindarViewerRef.value.sceneRef
  const arSystem = sceneEl.systems['mindar-image-system']
  if (!running.value) {
    arSystem.start()
    running.value = true
  } else {
    arSystem.stop()
    running.value = false
  }
}
</script>

<style scoped>
.container {
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: black;
  justify-content: center;
}
.containerMindar {
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
}

.startButton {
  padding: 0.75rem;
  background: var(--primary);
  color: #000;
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
