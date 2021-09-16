<template>
  <div>
    <h1>GUI</h1>
    <h2></h2>
    <ul>
      <li></li>
    </ul>
    
    <canvas id="renderCanvas1"/>
  </div>
</template>

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import {createScene} from "./control/Scene.js"

export default {
  name: 'GUI',
  components: {
    
  },
  mounted(){
    const canvas = document.getElementById("renderCanvas1");  // Get the canvas element
    const engine = new BABYLON.Engine(canvas, true);          // Generate the BABYLON 3D engine

    //Call the createScene function
    const scene = createScene(canvas, engine); 

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
            scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
            engine.resize();
    });
  }
}
</script>

<style >

#renderCanvas1 {
  width: 100%;
  height: 100%;
}

li {
    text-align: left;
}
</style>