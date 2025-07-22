<template>
    <canvas ref="gameCanvas" width="200" height="100">

    </canvas>
    <button type="submit" @click="cheeseBanana"> Use Cheese Banana</button>
</template>
  
<script setup>
  import { ref } from 'vue'
  const gameCanvas = ref(null)

  const rats = defineProps({
    rarity: Number,
  })
  gameCanvas.value.getContext('2d').fillrect(40, 100, 150, 100, 'black')

  function createTargetSize(){
    if (rats.rarity === 1){
      //Large target
      gameCanvas.value.getContext('2d').fillrect(60, 100, 100, 100, 'red')
    }
    else if (rats.rarity === 2){
      //Medium target
      gameCanvas.value.getContext('2d').fillrect(70, 100, 80, 100, 'red')
    }
    else if (rats.rarity === 3){
      //Small target
      gameCanvas.value.getContext('2d').fillrect(80, 100, 60, 100, 'red')
    }
    else if (rats.rarity === 4){
      //smaller target
      gameCanvas.value.getContext('2d').fillrect(60, 100, 40, 100, 'red')
    }
    else if (rats.rarity === 5){
      //even smaller!
      gameCanvas.value.getContext('2d').fillrect(60, 100, 20, 100, 'red')
    }
  }

  function cheeseBanana(){
    //if cheese banana item used, target grows bigger
    if (rats.rarity === 1){
      //Large target
      gameCanvas.value.getContext('2d').fillrect(60, 100, 100, 100, 'red')
    }
    else if (rats.rarity === 2){
      //Medium target
      gameCanvas.value.getContext('2d').fillrect(70, 100, 90, 100, 'red')
    }
    else if (rats.rarity === 3){
      //Small target
      gameCanvas.value.getContext('2d').fillrect(80, 100, 70, 100, 'red')
    }
    else if (rats.rarity === 4){
      //smaller target
      gameCanvas.value.getContext('2d').fillrect(60, 100, 50, 100, 'red')
    }
    else if (rats.rarity === 5){
      //even smaller!
      gameCanvas.value.getContext('2d').fillrect(60, 100, 30, 100, 'red')
    }

  }
 createTargetSize()

  
</script>
  