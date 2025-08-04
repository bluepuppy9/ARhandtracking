<template> 
        <div ref="top" class="topClickableStyle">
            <div class="bgForText">
                <div class="textNoTransparent">
                    <h1>Your miss rate of previous hit: {{ gameValues.missRate }}</h1>
                    <h1>Caught Rats: {{ gameValues.ratsCaught }}</h1>
                </div>
            </div>
            <canvas v-if="gameValues.ratNet > 0" ref="canvasBackground" class="canvasRound"></canvas>
            <h1 v-else> You don't have enough rat nets! Please replunish at a center.</h1>
        </div>
        <div v-if="gameValues.ratNet>0" class="bottomDivStyle">
            <h1>Rat Net(s): {{ gameValues.ratNet }}</h1>
            <button type="submit" class="buttonStyle" @click="cheeseBanana.useCheeseBana()">Cheese Banana: {{ cheeseBanana.amount }}</button>
        </div>
</template>

<script setup>


import { useTemplateRef, onMounted, ref, onUnmounted } from 'vue';

const htmlRefs = ref({
     top: useTemplateRef('top'),

})

const canvasItems = ref({
    canvasBackground: useTemplateRef('canvasBackground'),
    barX: ref(0),
    barWidth: ref(10),
    speed: ref(5),
    animationFrameId: null,

    createTargetZone(){
        const ctx = this.canvasBackground.value.getContext("2d");
        this.canvasBackground.value.width = 400;
        this.canvasBackground.value.height = 100;
        
        const gradient = ctx.createLinearGradient(0, 0, this.canvasBackground.value.width, 0);
        gradient.addColorStop(.2, "black");
        gradient.addColorStop(0.5, "yellow");
        gradient.addColorStop(.8, "black");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.canvasBackground.value.width, this.canvasBackground.value.height);
    },

    banaHelpTargetZone(){
        const ctx = this.canvasBackground.value.getContext("2d");
        this.canvasBackground.value.width = 400;
        this.canvasBackground.value.height = 100;
        
        const gradient = ctx.createLinearGradient(0, 0, this.canvasBackground.value.width, 0);
        gradient.addColorStop(.2, "black");
        gradient.addColorStop(.45, "yellow")
        gradient.addColorStop(.55, "yellow")
        gradient.addColorStop(.8, "black");

        ctx.fillStyle = gradient;

        ctx.fillRect(0, 0, this.canvasBackground.value.width, this.canvasBackground.value.height);
    },

    createBar(){
        if (this.barX.value < this.canvasBackground.value.width){
            this.barX.value+= this.speed;
        } else {
            this.barX.value = 0;
        }

        const ctx = this.canvasBackground.value.getContext("2d");
        ctx.fillStyle = "white";
        const centerBarX = this.barX.value-2
        ctx.fillRect(centerBarX, 0, this.barWidth, this.canvasBackground.value.height);
    },
    drawStuff(){
        if (cheeseBanana.value.additiononalRate === 0){
            this.createTargetZone();
        }
        else if (cheeseBanana.value.additiononalRate > 0){
            this.banaHelpTargetZone();
        }
        this.createBar();
    },
    animate(){
        this.drawStuff()
        this.animationFrameId = requestAnimationFrame(this.animate)
    },
    specialAnim(){
        this.barX.value = 0
        this.animate()
        gameValues.value.clickedPlay = 0
    },
})
const gameValues = ref({
    missRate: ref(0),
    ratsCaught: ref(0),
    ratNet: ref(3),
    clickedPlay: ref(0),

    mathBehindCatch(barXStop){
        if (barXStop){
            if (gameValues.ratNet.value > 0){
                if (Math.abs(barXStop) <= 200){
                    this.missRate.value = (((canvasItems.value.canvasBackground.value.width/2) - Math.abs(barXStop)) / 2) - cheeseBanana.value.additiononalRate
                    if (this.missRate.value < 0){
                        this.missRate.value = 0
                    }
                }
                else if (Math.abs(barXStop) > 200){
                    this.missRate.value = ((Math.abs(barXStop) - (canvasItems.value.canvasBackground.value.width/2)) /2) - cheeseBanana.value.additiononalRate
                    if (this.missRate.value < 0){
                        this.missRate.value = 0
                    }
                }

                const rateChance = Math.floor(Math.random()*101)
                if (rateChance > this.missRate.value){
                    ratCaught.value +=1
                }
                cheeseBanana.value.additiononalRate = 0
                gameValues.value.ratNet-=1
            }
        }
    },
    calculateCatch(){
        const barXStop = canvasItems.barX.value
        if (gameValues.value.clickedPlay === 0){
            gameValues.value.clickedPlay += 1 
            cancelAnimationFrame(canvasItems.value.animationFrameId.value)
            gameValues.value.mathBehindCatch(barXStop)
            setTimeout(canvasItems.value.specialAnim, 1000)
        }
    },
})

const cheeseBanana = ref({
    amount: ref(5),
    additiononalRate: ref(0),

    useCheeseBana(){
        if (this.additiononalRate.value !== 5){
            this.additiononalRate.value += 5
            this.amount.value-=1
        }
    }
})




    onMounted(() => {
        canvasItems.value.animate()
        htmlRefs.value.top.value.addEventListener("click", gameValues.value.calculateCatch())
    })

    onUnmounted(()=>{
        cancelAnimationFrame(animationFrameId)
        htmlRefs.top.value.removeEventListener('click', gameValues.value.calculateCatch())
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
        border-radius: 25rem;
        border-style: solid;
        border-width: 0.5rem;
        border-color: var(--secondary-border);
    }
    .canvasRound{
        border-radius: 25rem;
    }

    .buttonStyle{
        padding: 0.75rem;
        background: var(--primary);
        color: var(--secondary);
        border: none;
        border-radius: 0.5rem;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 0 10rem var(--primary);
    }

    .bottomDivStyle{
        height: 25vh;
        background-color: var(--secondary);
        color:var(--primary);
        border-top: solid 0.5rem var(--secondary-border);
    }

    .textNoTransparent{
        opacity: 1;
    }

</style>