<template>
    <div ref="top" class="topClickableStyle">
      <div class="bgForText">
        <div class="textNoTransparent">
          <h1>Your miss rate of previous hit: {{ gameValues.missRate }}</h1>
          <h1>Caught Rats: {{ gameValues.ratsCaught }}</h1>
        </div>
      </div>
  
      <canvas
        v-if="gameValues.ratNet > 0"
        ref="canvasBackground"
        class="canvasRound"
      ></canvas>
  
      <h1 v-else>
        You don't have enough rat nets! Please replenish at a center.
      </h1>
    </div>
  
    <div v-if="gameValues.ratNet > 0" class="bottomDivStyle">
      <h1>Rat Net(s): {{ gameValues.ratNet }}</h1>
      <button class="buttonStyle" @click="cheeseBanana.useCheeseBana">
        Cheese Banana: {{ cheeseBanana.amount }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, nextTick } from "vue";
  
  const top = ref(null);
  const canvasBackground = ref(null);
  
  function useCanvasItems(canvasBackground, cheeseBanana, gameValues) {
    const barX = ref(0);
    const barWidth = ref(10);
    const speed = ref(5);
    let animationFrameId = null;
  
    function reset() {
      barX.value = 0;
      barWidth.value = 10;
      speed.value = 5;
      animationFrameId = null;
    }
  
    function createTargetZone() {
      const ctx = canvasBackground.value.getContext("2d");
      canvasBackground.value.width = 400;
      canvasBackground.value.height = 100;
  
      const gradient = ctx.createLinearGradient(0, 0, canvasBackground.value.width, 0);
      gradient.addColorStop(0.2, "black");
      gradient.addColorStop(0.5, "yellow");
      gradient.addColorStop(0.8, "black");
  
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasBackground.value.width, canvasBackground.value.height);
    }
  
    function banaHelpTargetZone() {
      const ctx = canvasBackground.value.getContext("2d");
      canvasBackground.value.width = 400;
      canvasBackground.value.height = 100;
  
      const gradient = ctx.createLinearGradient(0, 0, canvasBackground.value.width, 0);
      gradient.addColorStop(0.2, "black");
      gradient.addColorStop(0.45, "yellow");
      gradient.addColorStop(0.55, "yellow");
      gradient.addColorStop(0.8, "black");
  
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasBackground.value.width, canvasBackground.value.height);
    }
  
    function createBar() {
      if (barX.value < canvasBackground.value.width) {
        barX.value += speed.value;
      } else {
        barX.value = 0;
      }
      const ctx = canvasBackground.value.getContext("2d");
      ctx.fillStyle = "white";
      const centerBarX = barX.value - 2;
      ctx.fillRect(centerBarX, 0, barWidth.value, canvasBackground.value.height);
    }
  
    function drawStuff() {
      const ctx = canvasBackground.value.getContext("2d");
      ctx.clearRect(0, 0, canvasBackground.value.width, canvasBackground.value.height);
  
      if (cheeseBanana.additiononalRate === 0) {
        createTargetZone();
      } else if (cheeseBanana.additiononalRate > 0) {
        banaHelpTargetZone();
      }
      createBar();
    }
  
    function animate() {
      drawStuff();
      animationFrameId = requestAnimationFrame(animate);
    }
  
    function specialAnim() {
      barX.value = 0;
      animate();
      gameValues.clickedPlay = 0;
    }
  
    function cancelAnimation() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  
    return {
      barX,
      barWidth,
      speed,
      reset,
      createTargetZone,
      banaHelpTargetZone,
      createBar,
      drawStuff,
      animate,
      specialAnim,
      cancelAnimation,
    };
  }
  
  function useCheeseBanana() {
    const amount = ref(5);
    const additiononalRate = ref(0);
  
    function reset() {
      amount.value = 5;
      additiononalRate.value = 0;
    }
  
    function useCheeseBana() {
      if (additiononalRate.value !== 5 && amount.value > 0) {
        additiononalRate.value += 5;
        amount.value -= 1;
      }
    }
  
    return { amount, additiononalRate, reset, useCheeseBana };
  }
  
  function useGameValues(canvasItems, cheeseBanana, canvasBackground) {
    const missRate = ref(0);
    const ratsCaught = ref(0);
    const ratNet = ref(3);
    const clickedPlay = ref(0);
  
    function reset() {
      missRate.value = 0;
      ratsCaught.value = 0;
      ratNet.value = 3;
      clickedPlay.value = 0;
    }
  
    function mathBehindCatch(barXStop) {
      if (barXStop !== null) {
        if (ratNet.value > 0) {
          if (Math.abs(barXStop) <= 200) {
            missRate.value =
              (canvasBackground.value.width / 2 - Math.abs(barXStop)) / 2 -
              cheeseBanana.additiononalRate.value;
            if (missRate.value < 0) missRate.value = 0;
          } else if (Math.abs(barXStop) > 200) {
            missRate.value =
              (Math.abs(barXStop) - canvasBackground.value.width / 2) / 2 -
              cheeseBanana.additiononalRate.value;
            if (missRate.value < 0) missRate.value = 0;
          }
  
          const rateChance = Math.floor(Math.random() * 101);
          if (rateChance > missRate.value) {
            ratsCaught.value += 1;
          }
          cheeseBanana.additiononalRate.value = 0;
          ratNet.value -= 1;
        }
      }
    }
  
    function calculateCatch() {
      const barXStop = canvasItems.barX.value;
      if (clickedPlay.value === 0) {
        clickedPlay.value += 1;
        canvasItems.cancelAnimation();
        mathBehindCatch(barXStop);
        setTimeout(() => canvasItems.specialAnim(), 1000);
      }
    }
  
    return { missRate, ratsCaught, ratNet, clickedPlay, reset, mathBehindCatch, calculateCatch };
  }
  
  const cheeseBanana = useCheeseBanana();
  const gameValues = useGameValues(null, cheeseBanana, null);
  const canvasItems = useCanvasItems(canvasBackground, cheeseBanana, gameValues);
  
 
  gameValues.calculateCatch = function () {
    const barXStop = canvasItems.barX.value;
    if (gameValues.clickedPlay.value === 0) {
      gameValues.clickedPlay.value += 1;
      canvasItems.cancelAnimation();
      gameValues.mathBehindCatch(barXStop);
      setTimeout(() => canvasItems.specialAnim(), 1000);
    }
  };
  
  gameValues.mathBehindCatch = function (barXStop) {
    if (barXStop !== null) {
      if (gameValues.ratNet.value > 0) {
        if (Math.abs(barXStop) <= 200) {
          gameValues.missRate.value =
            (canvasBackground.value.width / 2 - Math.abs(barXStop)) / 2 -
            cheeseBanana.additiononalRate.value;
          if (gameValues.missRate.value < 0) gameValues.missRate.value = 0;
        } else if (Math.abs(barXStop) > 200) {
          gameValues.missRate.value =
            (Math.abs(barXStop) - canvasBackground.value.width / 2) / 2 -
            cheeseBanana.additiononalRate.value;
          if (gameValues.missRate.value < 0) gameValues.missRate.value = 0;
        }
  
        const rateChance = Math.floor(Math.random() * 101);
        if (rateChance > gameValues.missRate.value) {
          gameValues.ratsCaught.value += 1;
        }
        cheeseBanana.additiononalRate.value = 0;
        gameValues.ratNet.value -= 1;
      }
    }
  };
  
  gameValues.reset = function () {
    gameValues.missRate.value = 0;
    gameValues.ratsCaught.value = 0;
    gameValues.ratNet.value = 3;
    gameValues.clickedPlay.value = 0;
  };
  
  onMounted(async () => {
    await nextTick();
    canvasItems.reset();
    gameValues.reset();
    cheeseBanana.reset();
  
    canvasItems.animate();
    top.value.addEventListener("click", gameValues.calculateCatch);
  });
  
  onUnmounted(() => {
    canvasItems.cancelAnimation();
    top.value.removeEventListener("click", gameValues.calculateCatch);
  });
  </script>
  
  <style scoped>
  .topClickableStyle {
    height: 75vh;
  }
  
  .bgForText {
    margin: 15% 2% 2% 2%;
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--primary);
    border-radius: 25rem;
    border: 0.5rem solid var(--secondary-border);
  }
  
  .canvasRound {
    border-radius: 20rem;
  }
  
  .buttonStyle {
    padding: 0.75rem;
    background: var(--primary);
    color: var(--secondary);
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 0 10rem var(--primary);
  }
  
  .bottomDivStyle {
    height: 25vh;
    background-color: var(--secondary);
    color: var(--primary);
    border-top: solid 0.5rem var(--secondary-border);
  }
  
  .textNoTransparent {
    opacity: 1;
  }
  </style>
  