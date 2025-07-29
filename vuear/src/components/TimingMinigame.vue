<template>
        <div>
            <h1>your miss rate: {{ missRate - cheeseBanaHelp }}</h1>
            <h1>Caught Rats: {{ ratCaught }}</h1>
        </div>
        <canvas ref="canvasBackground">
    
        </canvas>
        <div>
            <button type="submit" @click="useCheeseBana">Cheese Banana: {{ cheeseBanana }}</button>
        </div>
    
</template>

<script setup>

//To solve issue with clicking both window and button at the same time!
//Div styling and make the button = safe zone
import { useTemplateRef, onMounted, ref } from 'vue';
    //set up variables
    const canvasBackground = useTemplateRef('canvasBackground');
    const barX = ref(0)
    const missRate = ref(0)
    const ratCaught = ref(0)

    //cheese banana 
    const cheeseBanana = ref(3)
    const cheeseBanaHelp = ref(0)

    //functions
    function useCheeseBana(){
        cheeseBanaHelp.value += 5
        cheeseBanana.value-=1

    }
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
        if (barX.value < canvasBackground.value.width){
            barX.value+=5;
        } else {
            barX.value = 0;
        }

        const ctx = canvasBackground.value.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(barX.value, 0, 10, canvasBackground.value.height);
    }

    function drawStuff(){
        createTargetZone();
        createBar();
    }

    function calculateCatch(){
        const barXStop = barX.value
            if (Math.abs(barXStop) <= 200){
                missRate.value = ((200 - Math.abs(barXStop)) / 2) - cheeseBanaHelp.value
                if (missRate.value < 0){
                    missRate.value = 0
                }
            }
            else if (Math.abs(barXStop) > 200){
                missRate.value = ((Math.abs(barXStop) - 200) /2) - cheeseBanaHelp.value
                if (missRate.value < 0){
                    missRate.value = 0
                }
            }

            //Then randomize the numbers to see if they actually caught it
            const rateChance = Math.floor(Math.random()*101)
            if (rateChance > missRate.value){
                ratCaught.value +=1
                console.log("You caught the rat!")
            }
            //after calculations cheese banana goes bye bye
            cheeseBanaHelp.value = 0
    }    
    onMounted(() => {
        setInterval(drawStuff, 10)
        window.addEventListener("click", calculateCatch)
    })
</script>