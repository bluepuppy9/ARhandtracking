<template>
  <div class="main">
    <Login v-if="!isLoggedIn" />
    <div v-else>
      <div v-if="!running" class="container start-text">
        <h1>Welcome to the AR Ratdom</h1>
        <p>Please start the AR system to see the rats.</p>
      </div>

      <div class="button-container">
        <button class="startButton" :class="{ active: running }" @click="handleARSystems">
          {{ running ? 'STOP' : 'START' }}
        </button>
        <button @click="showRatdex = true" class="show-ratdex-btn" v-if="running">
          Show Ratdex
        </button>
      </div>

      <div class="viewer-container" v-show="running">
        <mindar-viewer ref="mindarViewerRef" />
      </div>

      <div v-if="showRatdex" class="ratdex-overlay">
        <div class="ratdex-wrapper">
          <Ratdex :ratdex="ratdexData" />
          <button @click="showRatdex = false" class="close-btn">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Login from '../components/login.vue'
import MindarViewer from '../components/MindArViewer.vue'
import Ratdex from '../components/ratdex.vue'
import { useUserStore } from '../stores/userStore'
import { ratdexData } from '@/assets/ratdexData'
import '../libs/mindar/mindar-image.prod.js'
import 'aframe'
import '../libs/mindar/mindar-image-aframe.prod.js'

const mindarViewerRef = ref(null)
const running = ref(false)
const showRatdex = ref(false)

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
    showRatdex.value = false // hide Ratdex on stop
  }
}
</script>

<style scoped>
.button-container {
  margin-bottom: 16px;
  text-align: center;
}

.start-stop-btn,
.show-ratdex-btn,
.close-btn {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  margin: 0.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--primary);
  color: var(--secondary);
  transition: background 0.3s;
}

.start-stop-btn:hover,
.show-ratdex-btn:hover,
.close-btn:hover {
  background-color: var(--primary-dark);
}

.viewer-container,
.containerMindar {
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
}

.ratdex-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.ratdex-wrapper {
  position: relative;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
}

.startButton {
  padding: 0.75rem;
  background: var(--primary);
  color: var(--secondary);
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.5s ease, top 0.5s ease;
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
