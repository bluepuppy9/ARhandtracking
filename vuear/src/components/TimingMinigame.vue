<template>
    <canvas ref="canvas">
    
    </canvas>
</template>

<script setup>
import { useTemplateRef, onMounted } from 'vue';

    //set up variables
    const canvas = useTemplateRef('canvas');

    //functions
    function createTargetZone(){
        const ctx = canvas.value.getContext("2d");
        canvas.value.width = 400;
        canvas.value.height = 100;
        
        //create gradient for target zone
        const gradient = ctx.createLinearGradient(0, 0, canvas.value.width, 0);
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.5, "red");
        gradient.addColorStop(1, "white");

        //set gradient to fill style
        ctx.fillStyle = gradient;

        //draw the target zone
        ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
    }

    function createGameBar(width, height, color, x, y){
        this.width = width
        this.height = height
        this.color = color
        this.x = x
        this.y = y
        this.update = function(){
            ctx = canvas.value.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    function updateCanvas(){
        const ctx = canvas.value.getContext("2d");
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
        createTargetZone();
        //Slide to right
        while (createGameBar.x < canvas.value.width - createGameBar.width){
            createGameBar.x +=1;
            createGameBar.update();
        }
        //Slide to left
        while (createGameBar.x > 0){
            createGameBar.x -=1;
            createGameBar.update();
        }
    }
    onMounted(() => {
        //set canvas size
        if (canvas.value){
            createTargetZone();
            createGameBar(10, canvas.value.height, "black", 0, canvas.value.height / 2);
            setInterval(updateCanvas);
        }
    })
</script>