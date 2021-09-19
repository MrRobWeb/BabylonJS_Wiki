<template>
  <div>
    <b-button-group>
      <b-button @click="scene.getLightByName('HemisphericLight').setEnabled(!scene.getLightByName('HemisphericLight').isEnabled())">HemisphericLight</b-button>
      <b-button @click="scene.getLightByName('PointLight').setEnabled(!scene.getLightByName('PointLight').isEnabled())">PointLight</b-button>
      <b-button @click="scene.getLightByName('DirectionalLight').setEnabled(!scene.getLightByName('DirectionalLight').isEnabled())">DirectionalLight</b-button>
      <b-button @click="scene.getLightByName('SpotLight').setEnabled(!scene.getLightByName('SpotLight').isEnabled())">SpotLight</b-button>
    </b-button-group>
    <hr>
    Spot Light Intensity
    <br>
    <b-button-group>
      <b-button @click="scene.getLightByName('SpotLight').intensity +=0.2">+</b-button>
      <b-button @click="scene.getLightByName('SpotLight').intensity -=0.2">-</b-button>
    </b-button-group>
    <hr>
    Include, exclude meshes from light
    <br>
    <b-button-group>
      <b-button @click="scene.getLightByName('HemisphericLight').excludedMeshes.push(scene.meshes[0])">Off - Iluminate Box</b-button>
      <b-button @click="scene.getLightByName('HemisphericLight').includedOnlyMeshes.push(scene.meshes[1])">On - Iluminate Sphere</b-button>
    </b-button-group>
    <canvas id="renderCanvas1"/>
    <h1>Light</h1>
    <p>
      Lights are used, as you would expect, to affect how meshes are seen, in terms of both illumination and colour. 
      All meshes allow light to pass through them unless shadow generation is activated. 
      The default number of lights allowed is four but this can be increased: 
      var material = new BABYLON.StandardMaterial("mat", scene);
      material.maxSimultaneousLights = 6;
    </p>
    <h2></h2>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import {createScene, createLights} from "../control/03_Light.js"

export default {
  name: 'Light',
  components: {
    
  },
  data() {
    return {
      canvas: "",
      engine: "",
      scene: ""
    }
  },
  computed(){
  },
  mounted(){
    const canvas = document.getElementById("renderCanvas1");  
    const engine = new BABYLON.Engine(canvas, true);          
    
    const scene = createScene(canvas, engine); 
    createLights(scene);
    engine.runRenderLoop(function () {
            scene.render();
    });

    window.addEventListener("resize", function () {
            engine.resize();
    });
    
    this.canvas = canvas;
    this.engine = engine;
    this.scene = scene;
    console.log();
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

p {
    text-align: left;
}
</style>