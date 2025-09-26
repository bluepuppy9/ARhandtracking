<template>
  <div class="entire-div">
    <div class="container-thing">
      <div class="bg-text">
        <h1>
          You found a station! You have {{ inventory.ratNets }} nets and
          {{ inventory.cheeseBanana }} cheese bananas.
        </h1>
      </div>
      <h1 v-if="obtainedAlready">You already robbed this station!</h1>
      <h1 v-if="obtainedAlready">Time Remaining: {{ timer }}</h1>
    </div>
    <div v-if="!obtainedAlready">
      <button type="submit" class="btn-style" @click="rollingItems">Roll for Items</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useInventoryStore } from '@/stores/inventory'

const inventory = useInventoryStore()
const obtainedAlready = ref(false)
const timer = ref(0)

function startTimer() {
  obtainedAlready.value = true
  timer.value = 10
  const countDown = setInterval(() => {
    if (timer.value > 1) {
      timer.value -= 1
    } else if (timer.value === 1) {
      obtainedAlready.value = false
      clearInterval(countDown)
    }
  }, 1000)
}

function rollingItems() {
  if (obtainedAlready.value === false) {
    const randomNumForCheeseBanana = Math.floor(Math.random() * 3)
    inventory.addCheeseBanana(randomNumForCheeseBanana)
    calculateRatNet()
    startTimer()
  }
}

function calculateRatNet() {
  const number = Math.floor(Math.random() * 3)
  if (number === 0) {
    inventory.addRatNet(5)
  } else if (number === 1) {
    inventory.addRatNet(6)
  } else if (number === 2) {
    inventory.addRatNet(7)
  }
}
</script>

<style scoped>
.entire-div {
  overflow: hidden !important;
  touch-action: none !important;
}
.container-thing {
  margin-top: 15%;
  height: 50vh;
  position: relative;
  z-index: 10000;
}

.bg-text {
  background-color: white;
  width: 90%;
  color: var(--base-text);
  text-align: center;
  text-wrap: wrap;
  align-self: center;
  border-color: var(--secondary-border);
  position: relative;
  z-index: 10001;
}

.btn-style {
  padding: 0.75rem;
  background: var(--primary);
  color: var(--secondary);
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10rem var(--primary);
  width: 50%;
  height: 3rem;
  position: relative;
  z-index: 10002;
}
</style>
