<template>
    <canvas ref="canvasBackground">
    
    </canvas>
</template>

<script setup>
import { useTemplateRef, onMounted } from 'vue';

    //set up variables
    const canvasBackground = useTemplateRef('canvasBackground');
    let barX = 0;

    //functions
    function createTargetZone(){
        const ctx = canvasBackground.value.getContext("2d");
        canvasBackground.value.width = 400;
        canvasBackground.value.height = 100;
        
        //create gradient for target zone
        const gradient = ctx.createLinearGradient(0, 0, canvasBackground.value.width, 0);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "orange");
        gradient.addColorStop(1, "red");

        //set gradient to fill style
        ctx.fillStyle = gradient;

        //draw the target zone
        ctx.fillRect(0, 0, canvasBackground.value.width, canvasBackground.value.height);
    }

    function createBar(){
        //calculate bar movement
        if (barX < canvasBackground.value.width){
            barX+=5;
        } else {
            barX = 0;
        }

        const ctx = canvasBackground.value.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(barX, 0, 10, canvasBackground.value.height);
    }

    function drawStuff(){
        createTargetZone();
        createBar();
    }

    onMounted(() => {
            setInterval(drawStuff, 10)
            window.addEventListener("click", ()=> {
                if (barX > 150 && barX < 250) {
                    console.log("You hit the target!");
                    gameOn.value = false
                }
            })
        
    })
</script>