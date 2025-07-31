<template>
    <div class="containerThing">
        <h1>You found a station!</h1>
        <h1>Your Net(s): {{ ratNets }}</h1>
        <h1>Your Cheese Banana(s): {{ cheeseBanana }}</h1>
        <div v-if="obtainedAlready === false">
            <button type="submit" @click="rollingItems">Roll for Items</button>
        </div>
        <div v-else>
            <h1>You already robbed this station!</h1>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue'

    const obtainedAlready = ref(false)
    const cheeseBanana = ref(0)
    const ratNets = ref(0)
    function rollingItems(){
        if (obtainedAlready.value === false){
            const randomNumForCheeseBanana = Math.floor(Math.random() *3)
            cheeseBanana.value += randomNumForCheeseBanana
            calculateRatNet()
            obtainedAlready.value = true
        }
    }

    function calculateRatNet(){
        const number = Math.floor(Math.random()*3)
        if (number === 0){
            ratNets.value += 5
        }
        else if (number === 1){
            ratNets.value += 6
        }
        else if (number === 2){
            ratNets.value += 7
        }
    }
</script>

<style scoped>
    .containerThing{
    margin-top: 15%
    }
</style>