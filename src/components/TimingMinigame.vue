<template>
  <div class="wrapper">
    <div ref="top" class="top-clickable-style">
      <h1 class="text-color">You found a rat!</h1>
      <canvas v-show="inventory.ratNets > 0" ref="canvasBackground" class="canvas-round"></canvas>
      <h1 v-show="inventory.ratNets === 0">
        You don't have enough rat nets! Please replunish at a center.
      </h1>
    </div>
    <div v-if="inventory.ratNets > 0" class="bottom-div-style">
      <div class="bg-for-btns">
        <div class="btn-div-case">
          <div class="button-div">
            <button
              type="submit"
              class="button-style"
              id="net-img"
              @click="gameValues.calculateCatch"
            ></button>
            <div class="btn-case-text">
              <h1>Amount Left:</h1>
              <p>{{ inventory.ratNets }}</p>
            </div>
          </div>
        </div>
        <div class="btn-div-case">
          <div class="button-div">
            <button
              type="submit"
              class="button-style"
              id="cheese-banana-img"
              @click="cheeseBanana.useCheeseBana"
            ></button>
            <div class="btn-case-text">
              <h1>Amount Left:</h1>
              <p>{{ inventory.cheeseBanana }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, useTemplateRef } from 'vue'
import { useInventoryStore } from '@/stores/inventory'
const top = useTemplateRef('top')
const canvasBackground = useTemplateRef('canvasBackground')
const inventory = useInventoryStore()

const gradientValues = {
  cheeseBanana: {
    0.2: '#FAE5BF',
    0.45: '#EFAB2C',
    0.55: '#EFAB2C',
    0.8: '#FAE5BF',
  },
  noCheeseBanana: {
    0.2: '#FAE5BF',
    0.5: '#EFAB2C',
    0.8: '#FAE5BF',
  },
}

const useGameValues = (canvasItems, cheeseBanana) => {
  const missRate = ref(0)
  const ratsCaught = inventory.ratsCaught
  const ratNet = inventory.ratNets
  const clickedPlay = ref(0)

  function reset() {
    missRate.value = 0
    clickedPlay.value = 0
  }

  function catchLogic(barXStop) {
    if (barXStop !== null && ratNet > 0) {
      const canvasWidth = 400
      const distanceFromCenter = Math.abs(barXStop - canvasWidth / 2)
      missRate.value = distanceFromCenter / 2 - cheeseBanana.additiononalRate.value
      missRate.value = Math.max(missRate.value, 0)

      const rateChance = Math.floor(Math.random() * 101)
      if (rateChance > missRate.value) {
        inventory.addRatsCaught()
      }

      cheeseBanana.additiononalRate.value = 0
      inventory.useRatNet()
      cheeseBanana.usedAlready.value = false
    }
  }

  function calculateCatch() {
    const barXStop = canvasItems.barX.value
    if (clickedPlay.value === 0) {
      clickedPlay.value++
      cancelAnimationFrame(canvasItems.animationFrameId.value)
      catchLogic(barXStop)
      setTimeout(() => canvasItems.specialAnim(), 1000)
    }
  }

  return {
    missRate,
    ratsCaught,
    ratNet,
    clickedPlay,
    reset,
    calculateCatch,
  }
}

const useCheeseBanana = () => {
  const amount = inventory.cheeseBanana
  const additiononalRate = ref(0)
  const usedAlready = ref(false)

  function reset() {
    additiononalRate.value = 0
    usedAlready.value = false
  }

  function useCheeseBana() {
    if (!usedAlready.value && inventory.ratNets > 0 && inventory.useCheeseBanana()) {
      usedAlready.value = true
      additiononalRate.value += 5
    }
  }

  return {
    amount,
    additiononalRate,
    reset,
    useCheeseBana,
    usedAlready,
  }
}

const useCanvasItems = (gameValues, cheeseBanana) => {
  const barX = ref(0)
  const barWidth = ref(10)
  const speed = ref(5)
  const animationFrameId = ref(null)

  function reset() {
    canvasBackground.value.width = 400
    canvasBackground.value.height = 100
    barX.value = 0
    barWidth.value = 10
    speed.value = 5
    animationFrameId.value = null
  }

  function createTargetZone(ctx, gradientItems) {
    const gradient = ctx.createLinearGradient(0, 0, canvasBackground.value.width, 0)
    for (const [key, value] of Object.entries(gradientItems)) {
      gradient.addColorStop(parseFloat(key), value)
    }
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasBackground.value.width, canvasBackground.value.height)
  }

  function createBar(ctx) {
    barX.value = barX.value < canvasBackground.value.width ? barX.value + speed.value : 0
    ctx.fillStyle = 'black'
    ctx.fillRect(barX.value - 2, 0, barWidth.value, canvasBackground.value.height)
  }

  function drawStuff() {
    const ctx = canvasBackground.value.getContext('2d')
    ctx.clearRect(0, 0, canvasBackground.value.width, canvasBackground.value.height)
    createTargetZone(
      ctx,
      cheeseBanana.usedAlready.value ? gradientValues.cheeseBanana : gradientValues.noCheeseBanana,
    )
    createBar(ctx)
  }

  function animate() {
    drawStuff()
    animationFrameId.value = requestAnimationFrame(() => animate())
  }

  function specialAnim() {
    barX.value = 0
    animate()
    gameValues.clickedPlay.value = 0
  }

  return {
    barX,
    animationFrameId,
    reset,
    animate,
    specialAnim,
  }
}

const cheeseBanana = useCheeseBanana()
const gameValues = {}
const canvasItems = useCanvasItems(gameValues, cheeseBanana)
Object.assign(gameValues, useGameValues(canvasItems, cheeseBanana))

onMounted(async () => {
  canvasItems.reset()
  gameValues.reset()
  await nextTick()
  canvasItems.animate()
  top.value?.addEventListener('click', gameValues.calculateCatch)
})

onUnmounted(() => {
  cancelAnimationFrame(canvasItems.animationFrameId.value)
  top.value?.removeEventListener('click', gameValues.calculateCatch)
})
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden !important;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  touch-action: none !important;
  overscroll-behavior: none !important;
  -webkit-overflow-scrolling: none !important;
}

.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
  z-index: 1000;
  box-sizing: border-box;
  -webkit-overflow-scrolling: none !important;
  touch-action: none !important;
  overscroll-behavior: none !important;
  user-select: none !important;
}

.top-clickable-style {
  padding-top: 15%;
  position: relative;
  height: 70%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden !important;
  user-select: none;
  pointer-events: auto;
  z-index: 9999;
  touch-action: none !important;
  overscroll-behavior: none !important;
}
.canvas-round {
  border-radius: 2rem;
  width: 100%;
  max-width: 400px;
  height: 100px;
  display: block;
  margin: 5% auto;
  pointer-events: none;
  box-sizing: border-box;
}

.bottom-div-style {
  display: flex;

  position: relative;
  height: 25%;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--secondary);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden !important;
  max-width: 100vw;
  touch-action: none !important;
  overscroll-behavior: none !important;
}
.btn-div-case {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 45%;
  color: var(--primary);
  justify-content: space-around;
}
.button-div {
  display: flex;
  align-items: center;
  width: 50%;
  height: 100%;
  margin: 0.5rem;
  justify-content: space-around;
}

.btn-case-text {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0.5rem;
}
.button-style {
  width: 100%;
  height: 100%;
  min-height: 4rem;
  min-width: 4rem;
  margin: 0.2rem;
  padding: 1rem 1.25rem;
  background: gray;
  color: var(--secondary);
  border: none;
  border-radius: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 1rem var(--primary);
  white-space: nowrap;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.text-no-transparent {
  opacity: 1;
}

.bg-for-btns {
  background-color: var(--primary);
  border-radius: 2rem;
  box-sizing: border-box;
  padding: 0.5rem;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.text-color {
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
  width: 90%;
  margin: 0 auto;
  color: var(--base-text);
  text-align: center;
}

#cheese-banana-img {
  background-image: url('@/assets/images/cheeseBanana.png');
}

#net-img {
  background-image: url('@/assets/images/ratNet.png');
}
</style>
