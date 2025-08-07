<template> 
        <div ref="top" class="top-clickable-style">
            <div class="bg-for-text">
                <div class="text-no-transparent">
                    <h1>Your miss rate of previous hit: {{ gameValues.missRate.value }}</h1>
                    <h1>Caught Rats: {{ gameValues.ratsCaught.value }}</h1>
                </div>
            </div>
            <canvas v-if="gameValues.ratNet.value > 0" ref="canvasBackground" class="canvas-round" width="400" height="100"></canvas>
            <h1 v-else> You don't have enough rat nets! Please replunish at a center.</h1>
        </div>
        <div v-if="gameValues.ratNet.value > 0" class="bottom-div-style">
            <h1>Rat Net(s): {{ gameValues.ratNet.value }}</h1>
            <button type="submit" class="button-style" @click="cheeseBanana.useCheeseBana">Cheese Banana: {{ cheeseBanana.amount.value }}</button>
        </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, useTemplateRef } from 'vue'

const top = useTemplateRef('top')
const canvasBackground = useTemplateRef('canvasBackground')

const useGameValues = (canvasItems, cheeseBanana) => {
  const missRate = ref(0)
  const ratsCaught = ref(0)
  const ratNet = ref(3)
  const clickedPlay = ref(0)

  function reset() {
    missRate.value = 0
    ratsCaught.value = 0
    ratNet.value = 3
    clickedPlay.value = 0
  }

  function mathBehindCatch(barXStop) {
    if (barXStop !== null && ratNet.value > 0) {
      const canvasWidth = canvasBackground.value?.width || 400
      const distanceFromCenter = Math.abs(barXStop - canvasWidth / 2)
      missRate.value = (distanceFromCenter / 2) - cheeseBanana.additiononalRate.value
      missRate.value = Math.max(missRate.value, 0)

      const rateChance = Math.floor(Math.random() * 101)
      if (rateChance > missRate.value) {
        ratsCaught.value++
      }

      cheeseBanana.additiononalRate.value = 0
      ratNet.value --
    }
  }

  function calculateCatch() {
    const barXStop = canvasItems.barX.value
    if (clickedPlay.value === 0) {
      clickedPlay.value ++
      cancelAnimationFrame(canvasItems.animationFrameId.value)
      mathBehindCatch(barXStop)
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
  const amount = ref(5)
  const additiononalRate = ref(0)

  function reset() {
    amount.value = 5
    additiononalRate.value = 0
  }

  function useCheeseBana() {
    if (additiononalRate.value !== 5 && amount.value > 0) {
      additiononalRate.value += 5
      amount.value --
    }
  }

  return {
    amount,
    additiononalRate,
    reset,
    useCheeseBana,
  }
}

const useCanvasItems = (gameValues, cheeseBanana) => {
  const barX = ref(0)
  const barWidth = ref(10)
  const speed = ref(5)
  const animationFrameId = ref(null)

  function reset() {
    barX.value = 0
    barWidth.value = 10
    speed.value = 5
    animationFrameId.value = null
  }

  function createTargetZone(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, canvasBackground.value.width, 0)
    const gradientItems = {
      0.2: 'black',
      0.5: 'yellow',
      0.8: 'black',
    }
    for (const [key, value] of Object.entries(gradientItems)) {
      gradient.addColorStop(parseFloat(key), value)
    }
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvasBackground.value.width, canvasBackground.value.height)
  }

  function banaHelpTargetZone(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, canvasBackground.value.width, 0)
    const gradientItems = {
      0.2: 'black',
      0.45: 'yellow',
      0.55: 'yellow',
      0.8: 'black',
    }
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

    if (cheeseBanana.additiononalRate.value === 0) {
      createTargetZone(ctx)
    } else {
      banaHelpTargetZone(ctx)
    }

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
const canvasItems = useCanvasItems({}, cheeseBanana)
const gameValues = useGameValues(canvasItems, cheeseBanana)
Object.assign(canvasItems, useCanvasItems(gameValues, cheeseBanana))

onMounted(async () => {
  canvasItems.reset()
  gameValues.reset()
  cheeseBanana.reset()
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
    .top-clickable-style{
        height: 75vh;
    }

    .bg-for-text{
        margin-top: 15%;
        margin-right: 2%;
        margin-bottom: 2%;
        margin-left: 2%;
        background-color: rgba(0,0,0, 0.5);
        color: var(--primary);
        border-radius: 25rem;
        border-style: solid;
        border-width: 0.2rem;
        border-color: var(--secondary-border);
    }
    .canvas-round{
        border-radius: 2rem;
    }

    .button-style{
        padding: 0.75rem;
        background: var(--primary);
        color: var(--secondary);
        border: none;
        border-radius: 0.5rem;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 0 10rem var(--primary);
    }

    .bottom-div-style{
        height: 25vh;
        background-color: var(--secondary);
        color:var(--primary);
        border-top: solid 0.2rem var(--secondary-border);
    }

    .text-no-transparent{
        opacity: 1;
    }

</style>