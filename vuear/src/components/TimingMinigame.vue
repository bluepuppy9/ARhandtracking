<template>
    <canvas ref="canvas">
    
    </canvas>
</template>

<script setup>
import { useTemplateRef, onMounted } from 'vue';

    //set up variables
    const canvas = useTemplateRef('canvas')
    let ctx = null

    onMounted(() => {
        //set canvas size
        ctx = canvas.value.getContext("2d");
        canvas.value.width = window.innerWidth;
        canvas.value.height = window.innerHeight;

        //create gradient for target zone
        const gradient = ctx.createLinearGradient(0, 0, canvas.value.width, 0);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.5, "red");
        gradient.addColorStop(1, "white");

        //set gradient to fill style
        ctx.fillStyle = gradient;

        //draw the target zone
        ctx.fillRect(canvas.value.width / 2 - 50, canvas.value.height, 100, 50);

        //make a moving bar to click on target zone
        movingBar = new component(5, 50, "black", canvas.value.width / 2 - 50, canvas.value.height)
    })
</script>