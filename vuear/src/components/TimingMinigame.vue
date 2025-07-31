<template> 
        <div ref="top" class="topClickableStyle">
            <div class="bgForText">
                <div class="textNoTransparent">
                    <h1>Your miss rate of previous hit: {{ missRate }}</h1>
                    <h1>Caught Rats: {{ ratCaught }}</h1>
                </div>
            </div>
            <canvas v-if="ratNet > 0" ref="canvasBackground" class="canvasRound"></canvas>
        </div>
        <div v-if="ratNet>0" class="bottomDivStyle">
            <h1>Rat Net(s): {{ ratNet }}</h1>
            <button type="submit" class="buttonStyle" @click="useCheeseBana">Cheese Banana: {{ cheeseBanana }}</button>
        </div>
    
    
</template>

<script setup>


import { useTemplateRef, onMounted, ref, reactive, onUnmounted } from 'vue';
    const canvasBackground = useTemplateRef('canvasBackground');
    const top = useTemplateRef('top')
    const barX = ref(0)
    const missRate = ref(0)
    const ratCaught = ref(0)
    
    let animationFrameId = null
    const clickedPlay = ref(0)

    const cheeseBanana = ref(3)
    const cheeseBanaHelp = ref(0)
    const ratNet = ref(3)

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
        
        const gradient = ctx.createLinearGradient(0, 0, canvasBackground.value.width, 0);
        gradient.addColorStop(.2, "black");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(.8, "black");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvasBackground.value.width, canvasBackground.value.height);
    }

    function banaHelpTargetZone(){
        const ctx = canvasBackground.value.getContext("2d");
        canvasBackground.value.width = 400;
        canvasBackground.value.height = 100;
        
        //create gradient for target zone
        const gradient = ctx.createLinearGradient(0, 0, canvasBackground.value.width, 0);
        gradient.addColorStop(.2, "black");
        gradient.addColorStop(.45, "yellow")
        gradient.addColorStop(.55, "yellow")
        gradient.addColorStop(.8, "black");

        //set gradient to fill style
        ctx.fillStyle = gradient;

        //draw the target zone
        ctx.fillRect(0, 0, canvasBackground.value.width, canvasBackground.value.height);
    }

    function createBar(){
        if (barX.value < canvasBackground.value.width){
            barX.value+=5;
        } else {
            barX.value = 0;
        }

        const ctx = canvasBackground.value.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(barX.value-2, 0, 10, canvasBackground.value.height);
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

            const rateChance = Math.floor(Math.random()*101)
            if (rateChance > missRate.value){
                ratCaught.value +=1
                console.log("You caught the rat!")
            }
            cheeseBanaHelp.value = 0
            ratNet.value-=1
        }
    }
    function calculateCatch(){
        const barXStop = barX.value
        if (clickedPlay.value === 0){
            clickedPlay.value += 1 
            cancelAnimationFrame(animationFrameId)
            mathBehindCatch(barXStop)
            setTimeout(specialAnim, 1000)
        }
    }
    function animate(){
        drawStuff()
        animationFrameId = requestAnimationFrame(animate)
    }
    function specialAnim(){
        barX.value = 0
        animate()
        clickedPlay.value = 0
    }
    onMounted(() => {
        animate()
        top.value.addEventListener("click", calculateCatch)
    })

    onUnmounted(()=>{
        cancelAnimationFrame(animationFrameId)
    })
</script>

<style scoped>
    .topClickableStyle{
        height: 75vh;
    }

    .bgForText{
        margin-top: 15%;
        margin-right: 2%;
        margin-bottom: 2%;
        margin-left: 2%;
        background-color: rgba(0, 0, 0, 0.5);
        color: var(--primary);
        border-radius: 25px;
        border-style: solid;
        border-width: 2px;
        border-color: var(--secondary-border);
    }
    .canvasRound{
        border-radius: 25px;
    }

    .buttonStyle{
        padding: 0.75rem;
        background: var(--primary);
        color: var(--secondary);
        border: none;
        border-radius: 0.5rem;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 0 10px var(--primary);
    }

    .bottomDivStyle{
        height: 25vh;
        background-color: var(--secondary);
        color:var(--primary);
        border-top: solid 2px var(--secondary-border);
    }

    .textNoTransparent{
        opacity: 1;
    }

</style>