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

import {createScene, createGUI} from "../control/04_GUI.js"

export default {
  name: 'GUI',
  components: {
    
  },
  mounted(){
    const canvas = document.getElementById("renderCanvas1");  
    const engine = new BABYLON.Engine(canvas, true);          

    const scene = createScene(canvas, engine); 
    createGUI(scene);

    

    engine.runRenderLoop(function () {
            scene.render();
    });

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