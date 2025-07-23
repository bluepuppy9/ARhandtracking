<template>
    <canvas ref="canvas" width="200" height="100">
    
    </canvas>
</template>

<script setup>
    const rat = defineProps({
        rat: Object
    })

    const canvas = ref(null)
    const ctx = canvas.value.getContext('2d')
    //Base bar
    ctx.fillRect(canvas.value.width / 2 - 50, canvas.value.height /2, 100, 50)

    movingBar = new component(5, 50, "white", canvas.value.width / 2 - 50, canvas.value.height / 2)

    function createTargetZone(){
        const red = "#ff0000"
        ctx.fillStyle = red
        if (rat.rarity === 1){
            ctx.fillRect(canvas.value.width / 2 - 30, canvas.value.height /2, 65, 50)
        } else if (rat.rarity === 2){
            ctx.fillRect(canvas.value.width / 2 - 20, canvas.value.height /2, 55, 50)
        } else if (rat.rarity === 3){
            ctx.fillRect(canvas.value.width / 2 - 10, canvas.value.height /2, 50, 50)
        } else if (rat.rarity === 4){
            ctx.fillRect(canvas.value.width / 2, canvas.value.height /2, 35, 50)
        } else if (rat.rarity === 5){
            ctx.fillRect(canvas.value.width / 2, canvas.value.height /2, 20, 50)
        }
    }

    createTargetZone()
</script>