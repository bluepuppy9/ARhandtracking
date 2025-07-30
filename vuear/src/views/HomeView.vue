<template>
  <div class="main">
    <Login v-if="!isLoggedIn" />

    <div v-else>
      <div class="button-container">
        <button @click="handleARSystems" class="start-stop-btn">
          {{ title }}
        </button>
        <button @click="showRatdex = true" class="show-ratdex-btn">
          Show Ratdex
        </button>
      </div>

      <div class="viewer-container">
        <mindar-viewer ref="mindarViewerRef" />
      </div>

      <div v-if="showRatdex" class="ratdex-overlay">
        <div class="ratdex-wrapper">
          <Ratdex :ratdex="ratdexData" />
          <button @click="showRatdex = false" class="close-btn">
            Close
          </button>
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

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)

const title = ref('START')
const showRatdex = ref(false)
const mindarViewerRef = ref(null)

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
.button-container {
  margin-bottom: 16px;
}

.start-stop-btn {
  margin-right: 12px;
}

.viewer-container {
  height: 100vh;
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
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
</style>
