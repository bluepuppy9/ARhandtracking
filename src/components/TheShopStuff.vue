<template>
  <div class="entire-div">
    <div class="container-thing">
      <div class="white-bubble-text">
        <h1>
          You found a station! You have {{ inventory.ratNets }} nets and
          {{ inventory.cheeseBanana }} cheese bananas.
        </h1>
      </div>
      <h1 v-if="obtainedAlready">You already robbed this station!</h1>
      <h1 v-if="obtainedAlready">Time Remaining: {{ timer }}</h1>
    </div>
    <div class="bottom-div-style">
      <div class="bg-div">
        <button v-if="!obtainedAlready" type="submit" class="btn-style" @click="rollingItems">
          Roll for Items
        </button>
        <h1 v-else class="white-text">
          You robbed {{ robbedNets }} nets and {{ robbedBanana }} cheese banana(s).
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInventoryStore } from '@/stores/inventory'

const inventory = useInventoryStore()
const obtainedAlready = ref(false)
const timer = ref(0)
const robbedBanana = ref(0)
const robbedNets = ref(0)

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
    robbedBanana.value = randomNumForCheeseBanana
    inventory.addCheeseBanana(randomNumForCheeseBanana)
    calculateRatNet()
    startTimer()
  }
}

function calculateRatNet() {
  const number = Math.floor(Math.random() * 3)
  if (number === 0) {
    robbedNets.value = 5
    inventory.addRatNet(5)
  } else if (number === 1) {
    robbedNets.value = 6
    inventory.addRatNet(6)
  } else if (number === 2) {
    robbedNets.value = 7
    inventory.addRatNet(7)
  }
}
</script>

<style scoped>
.entire-div {
  overflow: hidden !important;
  touch-action: none !important;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}
.container-thing {
  padding-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 70%;
  position: relative;
  z-index: 10000;
}

.btn-style {
  width: 80%;
  border-radius: 1rem;
  border: var(--base-text) solid 0.2rem;
  padding: 0.75rem;
  background: #fae5bf;
  color: var(--base-text);
  font-family: var(--btn-font);
  z-index: 10002;
}
.bottom-div-style {
  display: flex;
  position: relative;
  height: 25%;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--secondary);
  color: var(--primary);
  align-items: center;
  justify-content: center;
  overflow: hidden !important;
  max-width: 100vw;
  touch-action: none !important;
  overscroll-behavior: none !important;
}

.bg-div {
  font-family: var(--title-font);
  font-size: 1.3rem;
  width: 80%;
  height: 47%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  border-radius: 2rem;
  padding: 0.5rem;
}
.white-text {
  color: white;
}
</style>
