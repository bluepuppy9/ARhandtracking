
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

    <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

    <a-entity mindar-image-target="targetIndex: 0">
      
      <a-gltf-model
        rotation="0 0 0 "
        position="0 0 0.1"
        scale="0.1 0.1 0.1"
        src="#avatarModel"
        animation="property: rotation; to: 0 360 0; dur: 1000; easing: linear; loop: true;"
        ></a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<script setup>  
  import { ref } from 'vue'

  const sceneRef = ref(null)
</script>