<template>
  <div class="wrapper">
    <div ref="top" class="top-clickable-style">
      <div class="bg-for-text">
        <div class="text-no-transparent">
          <h1>Your miss rate of previous hit: {{ gameValues.missRate.value }}</h1>
          <h1>Caught Rats: {{ inventory.ratsCaught }}</h1>
        </div>
      </div>
      <canvas v-if="inventory.ratNets > 0" ref="canvasBackground" class="canvas-round"></canvas>
      <h1 v-else> You don't have enough rat nets! Please replunish at a center.</h1>
    </div>
    <div v-if="inventory.ratNets > 0" class="bottom-div-style">
      <h1>Rat Net(s): {{ inventory.ratNets }}</h1>
      <button type="submit" class="button-style" @click="cheeseBanana.useCheeseBana">Cheese Banana: {{
        inventory.cheeseBanana }}</button>
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
    0.2: 'black',
    0.45: 'yellow',
    0.55: 'yellow',
    0.8: 'black',
  },
  noCheeseBanana: {
    0.2: 'black',
    0.5: 'yellow',
    0.8: 'black',
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
      missRate.value = (distanceFromCenter / 2) - cheeseBanana.additiononalRate.value
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
    barX.value = barX.value < canvasBackground.value.width
      ? barX.value + speed.value
      : 0
    ctx.fillStyle = 'white'
    ctx.fillRect(barX.value - 2, 0, barWidth.value, canvasBackground.value.height)
  }

  function drawStuff() {
    const ctx = canvasBackground.value.getContext('2d')
    ctx.clearRect(0, 0, canvasBackground.value.width, canvasBackground.value.height)
    createTargetZone(ctx, cheeseBanana.usedAlready.value ? gradientValues.cheeseBanana : gradientValues.noCheeseBanana)
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
.wrapper {
  outline: solid 2px green;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.top-clickable-style {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  outline: 2px solid red;
}

.bg-for-text {
  outline: 2px solid blue;
  margin-top: 15%;
  margin-right: 2%;
  margin-bottom: 2%;
  margin-left: 2%;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--primary);
  border-radius: 25rem;
  border-style: solid;
  border-width: 0.2rem;
  border-color: var(--secondary-border);
}

.canvas-round {
  border-radius: 2rem;
  width: 400px;
  height: 100px;
  display: block;
  margin: 0 auto;
}

.button-style {
  padding: 0.75rem;
  background: var(--primary);
  color: var(--secondary);
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10rem var(--primary);
}

.bottom-div-style {
  height: 25vh;
  width: 100%;
  outline: 2px solid gray;
  background-color: var(--secondary);
  color: var(--primary);
  border-top: solid 0.2rem var(--secondary-border);
  box-sizing: border-box;
}

.text-no-transparent {
  opacity: 1;
}
</style>