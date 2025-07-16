<script setup>
  import './libs/mindar/mindar-image.prod.js'
  import 'aframe'
  import './libs/mindar/mindar-image-aframe.prod.js'
  import MindarViewer from './components/mindarViewer.vue'
  import { ref } from 'vue'

  const mindarViewerRef = ref(null)
  const title = ref('START')

  function handleARSystems() {    
    const sceneEl = mindarViewerRef.value.sceneRef
    const arSystem = sceneEl.systems['mindar-image-system']
    if(title.value == 'START') {
      arSystem.start()
      title.value = 'STOP'
    } else {
      arSystem.stop()
      title.value = 'START'
    }

  }

  //Hey lets go with raycaster!

  const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

	renderer.render( scene, camera );

}

window.addEventListener( 'pointermove', onPointerMove );

window.requestAnimationFrame(render);

</script>

<template>
  <div class="app">
    <h1>
      Example Vue 3 with
      <a href="https://github.com/hiukim/mind-ar-js" target="_blank">MindAR</a>
    </h1>

    <div>
      <button @click="handleARSystems()">{{ title }}</button>
    </div>

    <div class="container">
      <mindar-viewer ref="mindarViewerRef" />
    </div>
  </div>
</template>

<style scoped>
.app {
  text-align: center;
}

.container {
  margin: 20px auto;
  position: relative;
  height: 400px;
  width: 600px;
  overflow: hidden;
}
</style>
