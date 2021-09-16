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
    <a href="https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction">https://doc.babylonjs.com/divingDeeper/cameras/camera_introduction</a>
    <ul>
      <li>
        Of the many cameras available in Babylon.js, the two most used are probably the Universal Camera, used for "first-person" movement, ArcRotateCamera, an orbital camera, and WebXRCamera, used for modern virtual reality experiences.
      </li>
      <li>To allow user input, a camera must be attached to the canvas using: camera.attachControl(canvas, true);</li>
      <li>The second parameter is optional and defaults to false, which prevents default actions on a canvas event. Set to true to allow canvas default actions.</li>
    </ul>
    <h2>Universal Camera</h2>
    <ul>
      <li>This was introduced with version 2.3 of Babylon.js and is controlled by the keyboard, mouse, touch, or gamepad depending on the input device used, with no need for the controller to be specified. This extends and replaces the Free Camera, the Touch Camera and the Gamepad Camera, which are all still available.</li>
    </ul>
    <h2>Arc Rotate Camera</h2>
    <ul>
      <li>This camera always points towards a given target position and can be rotated around that target with the target as the center of rotation. It can be controlled with cursors and mouse, or with touch events.</li>
      <li>Think of this camera as one orbiting its target position, or more imaginatively as a satellite orbiting the earth. Its position relative to the target ("Earth") can be set by three parameters:</li>
      <ul>
        <li>alpha (the longitudinal rotation, in radians),</li>
        <li>beta (the latitudinal rotation, in radians), and</li>
        <li>radius (the distance from the target).</li>
        <img src="../assets/camalphabeta.jpg">
      </ul>
    </ul>
    
    <h2>Follow Camera</h2>
    <ul>
      <li>The FollowCamera does what it says on the tin. Give it a mesh as a target, and from whatever position it is currently at it will move to a goal position from which to view the target. When the target moves, so will the Follow Camera.</li>
      <li>The initial position of the Follow Camera is set when it is created then the goal position is set with three parameters:</li>
      <ul>
        <li>radius: the distance from the target</li>
        <li>heightOffset: the height above the target;</li>
        <li>rotationOffset: the goal angle in degrees around the target in the x y plane.</li>
      </ul>
      <li>The speed with which the camera moves to a goal position is set through its acceleration (cameraAcceleration) up to a maximum speed (maxCameraSpeed).</li>
    </ul>
    <h2>Fly Camera</h2>
    <ul>
      <li>FlyCamera imitates free movement in 3D space, think "a ghost in space." It comes with an option to gradually correct Roll, and also an option to mimic banked-turns.</li>
      <li>Keyboard - The A and D keys move the camera left and right. The W and S keys move it forward and backward. The E and Q keys move it up and down.</li>
      <li>Mouse - Rotates the camera about the Pitch and Yaw (X, Y) axes with the camera as the origin. Holding the right mouse button rotates the camera about the Roll (Z) axis with the camera as the origin.</li>
    </ul>
  </div>
</template> 

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import {createScene, createCameras} from "./control/Camera.js";

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
    changeScene() {
      const canvas = document.getElementById("renderCanvas1");  
      const engine = new BABYLON.Engine(canvas, true);          
      const scene = createScene(engine); 

      createCameras(canvas, scene);

      engine.runRenderLoop(function () {
              scene.render();
      });

      window.addEventListener("resize", function () {
              engine.resize();
      });
    }
  },
  mounted(){
    const canvas = document.getElementById("renderCanvas1");  
    const engine = new BABYLON.Engine(canvas, true);          
    const scene = createScene(engine); 

    createCameras(canvas, scene);

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