<script setup>
import { ref, defineExpose, onMounted } from 'vue'

const sceneRef = ref(null)
defineExpose({ sceneRef })

//Rat Model down below
const ratModel = ref(null) //set the stuff first
const isBig = ref(true)

//Down here is where you add clicky stuff
onMounted(()=> {
  window.addEventListener('DOMContentLoaded', ()=>{
    const rat = ratModel.value;
    if (rat){ //if model is loaded do the following
      rat.addEventListener("click", ()=> { //if model clicked do the bottom
        console.log("Rat was clicked!");

        if (isBig.value){
          rat.setAttribute("scale", "0.5 0.5 0.5"); //Set to smaller size
          isBig.value = false;
        }
        else if (!isBig.value){
          rat.setAttribute("scale", "1 1 1"); //Set to larger size
          isBig.value = true;
        }
      })
    }
    //Additional event listeners for different models can go down below
  })
})


</script>

<template>
  <a-scene
    ref="sceneRef"
    mindar-image="imageTargetSrc: /targetsRAT.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;" 
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
  >
    <a-assets>
      <a-asset-item
        id="avatarModel"
        src="/rat.glb"
        crossorigin
      ></a-asset-item>
    </a-assets>

    <a-camera 
      position="0 0 0" 
      look-controls="enabled: false" 
      cursor="fuse: false; rayOrigin: mouse;"
      raycaster="far: 100000; objects: .clickable">
    </a-camera>

    <a-entity mindar-image-target="targetIndex: 0">
      <a-gltf-model
        class="clickable"
        ref="ratModel"
        rotation="0 0 0"
        position="0 0 -1"
        scale="1 1 1"
        src="#avatarModel"
        animation="property: rotation; to: 0 360 0; dur: 1000; easing: linear; loop: true;"
      >
    </a-gltf-model>
    </a-entity>
  </a-scene>
</template>