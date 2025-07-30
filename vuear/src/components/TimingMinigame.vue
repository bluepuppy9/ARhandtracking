<template> 
        <div ref="top" :style="topDivStyle">
            <div :style="textBg">
                <h1>Your miss rate of previous hit: {{ missRate }}</h1>
                <h1>Caught Rats: {{ ratCaught }}</h1>
            </div>
            <canvas v-if="ratNet > 0" ref="canvasBackground"></canvas>
        </div>
        <div v-if="ratNet>0" :style="bottomDivStyle">
            <h1>Rat Net(s): {{ ratNet }}</h1>
            <button type="submit" :style="buttonStyle" @click="useCheeseBana">Cheese Banana: {{ cheeseBanana }}</button>
        </div>
    
    
</template>

<script setup>

//To solve issue with clicking both window and button at the same time!
//Div styling and make the button = safe zone
import { useTemplateRef, onMounted, ref, reactive, onUnmounted } from 'vue';
    //Styling
    const buttonStyle = reactive({
        backgroundColor: 'yellow',
        color: 'black',
        borderStyle: 'black',
        borderWidth: '2px',
    })
    const textBg = reactive({
        backgroundColor: 'black',
        color: 'yellow',
        opacity: '.2',
        margin: '2%',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderColor: 'yellow'
    })
    const topDivStyle = reactive({
        height: '80vh',
    })

    const bottomDivStyle = reactive({
        height: '20vh',
        backgroundColor: 'black',
        color: "yellow",
        borderTop: 'solid 2px yellow',
    })

    //set up variables
    const canvasBackground = useTemplateRef('canvasBackground');
    const top = useTemplateRef('top')
    const barX = ref(0)
    const missRate = ref(0)
    const ratCaught = ref(0)
    //animation
    const animationPause = ref(false)
    let animationFrameId = null

    //cheese banana 
    const cheeseBanana = ref(3)
    const cheeseBanaHelp = ref(0)

    //nets
    const ratNet = ref(3)

    //functions
    function useCheeseBana(){
        if (cheeseBanaHelp.value !== 5){
            cheeseBanaHelp.value += 5
            cheeseBanana.value-=1
        }
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

    function banaHelpTargetZone(){
        const ctx = canvasBackground.value.getContext("2d");
        canvasBackground.value.width = 400;
        canvasBackground.value.height = 100;
        
        //create gradient for target zone
        const gradient = ctx.createLinearGradient(0, 0, canvasBackground.value.width, 0);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(.45, "orange")
        gradient.addColorStop(.55, "orange")
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
        if (cheeseBanaHelp.value === 0){
            createTargetZone();
        }
        else if (cheeseBanaHelp.value > 0){
            banaHelpTargetZone();
        }
        createBar();
    }
    function mathBehindCatch(barXStop){
        if (ratNet.value > 0){
            if (Math.abs(barXStop) <= 200){
                missRate.value = (((canvasBackground.value.width/2) - Math.abs(barXStop)) / 2) - cheeseBanaHelp.value
                if (missRate.value < 0){
                    missRate.value = 0
                }
            }
            else if (Math.abs(barXStop) > 200){
                missRate.value = ((Math.abs(barXStop) - (canvasBackground.value.width/2)) /2) - cheeseBanaHelp.value
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
            ratNet.value-=1
        }
    }
    function calculateCatch(){
        const barXStop = barX.value
        animationPause.value = true
        cancelAnimationFrame(animationFrameId)
        setTimeout(animate, 500)
        mathBehindCatch(barXStop)
    }
    function animate(){
        drawStuff()
        animationFrameId = requestAnimationFrame(animate)
    }
    onMounted(() => {
        animate()
        top.value.addEventListener("click", calculateCatch)
    })

    onUnmounted(()=>{
        cancelAnimationFrame(animationFrameId)
    })
</script>