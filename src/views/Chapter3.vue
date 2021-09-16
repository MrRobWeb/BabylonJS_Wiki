<template>
  <div class="Chapter1">
    <h1>Chapter3</h1>
    <canvas id="renderCanvas"/>
  </div>
</template>

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import {createScene} from "./control/Chapter3.js"

export default {
  name: 'Chapter3',
  components: {
    
  },
  mounted(){
    const canvas = document.getElementById("renderCanvas");  
    const engine = new BABYLON.Engine(canvas, true);   
    const scene = createScene(canvas, engine); 

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

#renderCanvas {
  width: 100%;
  height: 100%;
}
</style>