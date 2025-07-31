<template>
  <div class="main">
    <Login v-if="!isLoggedIn" />
    <div v-else>

      <div class="burger-menu" @click="toggleMenu">
        &#9776;
      </div>

      <div class="overlay-menu" v-if="menuOpen">
        <ul>
          <li @click="openRatdex">Ratdex</li>
          <li>Leaderboard</li>
          <li>Log Out</li>
        </ul>
      </div>

      <div v-if="!running" class="container start-text">
        <h1>Welcome to the AR Ratdom</h1>
        <p>Please start the AR system to see the rats.</p>
      </div>

      <div class="button-container" :class="{ active: running }">
        <button class="startButton" @click="handleARSystems">
          {{ running ? 'STOP' : 'START' }}
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
import Login from '../components/Login.vue'
import MindarViewer from '../components/MindarViewer.vue'
import Ratdex from '../components/Ratdex.vue'
import { useUserStore } from '../stores/userStore'
import { ratdexData } from '@/assets/ratdexData'
import '../libs/mindar/mindar-image.prod.js'
import 'aframe'
import '../libs/mindar/mindar-image-aframe.prod.js'

const mindarViewerRef = ref(null)
const running = ref(false)
const showRatdex = ref(false)
const menuOpen = ref(false)

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
    showRatdex.value = false
  }
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function openRatdex() {
  showRatdex.value = true
  menuOpen.value = false
}
</script>

<style scoped>

.burger-menu {
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  color: var(--secondary);
  background-color: var(--primary);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  box-shadow: 0 0 8px var(--primary);
}

.overlay-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 1rem 2rem;
  z-index: 1000;
  color: white;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.overlay-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.overlay-menu li {
  margin: 1rem 0;
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.3s;
}

.overlay-menu li:hover {
  color: var(--primary);
}

.button-container {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: top 0.5s ease, transform 0.5s ease;
  z-index: 10;
}

.button-container.active {
  top: 1%;
  transform: translate(-50%, 0);
}

.startButton {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--primary);
  color: var(--secondary);
  font-weight: bold;
  box-shadow: 0 0 10px var(--primary);
  transition: background 0.3s;
  z-index: 1000;
}

.startButton:hover,
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
  background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1002;
}

.ratdex-wrapper {
  position: relative;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;

}
</style>
