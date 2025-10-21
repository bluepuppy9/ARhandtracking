<template>
  <div class="main">
    <signup v-if="!isLoggedIn" />
    <div v-if="isLoggedIn">
      <div class="containerMindar" v-show="running">
        <mindar-viewer ref="mindarViewerRef" />
      </div>
      <div class="container start-text">
        <div v-if="!running" class="start-text-div">
          <h1 class="title-heading">Welcome to the AR Ratdom.</h1>
          <p class="mini-text">Please start the AR system to see the rats.</p>
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
import signup from '../components/Signup.vue'
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
  } else if (running.value) {
    arSystem.stop()
    running.value = false
  }
}
</script>

<style scoped>
.main {
  overflow: hidden;
  touch-action: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: var(--base-text);
}

.containerMindar {
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
}

.startButton {
  font-family: var(--sub-title-font);
  font-weight: 700;
  font-style: Bold;
  font-size: 2.2rem;
  line-height: 100%;
  letter-spacing: 10%;

  width: 20%;
  z-index: 200000;
  padding: 0.75rem;
  background: #fae5bf;
  color: var(--base-text);
  border: none;
  box-shadow: 0px 4px 7px 0px #d37d27;

  border-radius: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    transform 0.5s ease,
    top 0.5s ease;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.startButton.active {
  top: 1%;
  transform: translate(-50%, 0);
}

.start-text-div {
  text-align: left;
  position: absolute;
  top: 35%;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.heading {
  font-family: var(--title-font);
  font-weight: 400;
  font-style: Regular;
  font-size: 2.8rem;
  line-height: 130%;
  letter-spacing: 0%;
}
.mini-text {
  margin: 5% auto;
  font-family: var(--sub-title-font);
  font-weight: 400;
  font-style: Regular;
  font-size: 1.4rem;
  line-height: 120%;
  letter-spacing: 0%;
}
</style>
