<template>
  <div>
    <h1>Camera Types</h1>
    <b-button-group>
      <b-button @click="scene.setActiveCameraByName('UniversalCamera')">Universal Camera</b-button>
      <b-button @click="scene.setActiveCameraByName('ArcRotateCamera')">Arc Rotate Camera</b-button>
      <b-button @click="scene.setActiveCameraByName('FollowCamera')">Follow Camera</b-button>
      <b-button @click="scene.setActiveCameraByName('FlyCamera')">Fly Camera</b-button>
    </b-button-group>
    <canvas id="renderCanvas1"/>
    <hr>
    <a href="https://doc.babylonjs.com/divingDeeper/cameras/customizingCameraInputs">https://doc.babylonjs.com/divingDeeper/cameras/customizingCameraInputs</a>
    <ul>
      <li>Every Babylon.js camera will automatically handle inputs for you, once you call the camera's attachControl method. 
        You can revoke the control by using the detachControl method. Most Babylon.js experts use a two-step process to activate and attach a camera:
      </li>
      <ul>
        <li>Enable inputs -> attachControl: scene.activeCamera.attachControl(canvas, true);</li>
        <li>camera.inputs.attachInput(camera.inputs.attached.mouse);</li>
        <li>Disable inputs -> detachControl: scene.activeCamera.detachControl();</li>
        <li>camera.inputs.attached.mouse.detachControl();</li>
        <li>The Input Manager: var inputManager = camera.inputs;</li>
      </ul>
      <li>Removing inputs</li>
      <ul>
        <li>remove all inputs: camera.inputs.clear();</li>
        <li>remove an instance: camera.inputs.remove(camera.inputs.attached.mouse);</li>
        <li>remove by type: camera.inputs.removeByType("FreeCameraKeyboardMoveInput");</li>
      </ul>
      <li>Adding Existing inputs</li>
      <ul>
        <li>camera.inputs.addGamepad();</li>
        <li>camera.inputs.add(new BABYLON.FreeCameraGamepadInput());</li>
        <li>camera.inputs.addMouse();</li>
      </ul>
      <li>Adding Custom inputs</li>
      <ul>
        <li>Your input method is created as a function object. You must then write code for several methods, with required names, that are called by the input function object. The method names and purpose are:</li>
        <li>getClassName(), getSimpleName(), attachControl(element, noPreventDefault), detachControl(element), checkInputs()</li>
      </ul>
    </ul>  
  </div>
</template> 

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import {createScene, createCameras, setCameraCollision, manageInputs} from "./control/02_Camera.js";

export default {
  name: 'Camera',
  components: {
    
  },
  data() {
    return {
      canvas: "",
      engine: "",
      scene: ""
    }
  },
  methods: {
  },
  mounted(){
    const canvas = document.getElementById("renderCanvas1");  
    const engine = new BABYLON.Engine(canvas, true);          
    const scene = createScene(engine); 

    createCameras(canvas, scene);
    setCameraCollision(scene);
    manageInputs(canvas, scene);

    engine.runRenderLoop(function () {
            scene.render();
    });

    window.addEventListener("resize", function () {
            engine.resize();
    });

    this.canvas = canvas;
    this.engine = engine;
    this.scene = scene;
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