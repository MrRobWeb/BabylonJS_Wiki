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
    <a href="https://doc.babylonjs.com/divingDeeper/cameras/camera_collisions">https://doc.babylonjs.com/divingDeeper/cameras/camera_collisions</a>
    <ul>
      <li>To replicate FPS (First-Person Shooter) movement, we have to do 3 simple steps:</li>
      <ul>
        <li>Set gravity</li>
        <li>Definition of an ellipsoid around our camera. This ellipsoid represents our player’s dimensions</li>
        <li>Apply collision</li>
      </ul>
    </ul>
    <h2>Camera collision</h2>
    <h3>Gravity</h3>
    Babylon.js follows a much simpler gravitational model, however -- scene.gravity represents a constant velocity, 
    not a force of acceleration, and it is measured in units/frame rather than meters/second. As each frame is rendered, 
    the cameras you apply this gravity to will move by the vector's value along each axis (usually x and z are set to 0, 
    but you can have "gravity" in any direction!), until a collision is detected.
    <ul>
      <li>Babylon.js Scenes have a gravity property that can be applied to any camera you've previously defined in your code.</li>
      <li>This will move the camera along the direction and speed specified (a Vector3 object) unless the camera's ellipsoid (see #2 below) is colliding with another mesh in that direction (such as your ground mesh) with checkCollisions set to true.</li>
    </ul>
    <h3> Define an ellipsoid </h3>
    <ul>
      <li> The next important step is to define the ellipsoid around our camera. This ellipsoid represents our player’s dimensions: 
          a collision event will be raised when a mesh comes in contact with this ellipsoid, preventing our camera from getting too close to this mesh:
      </li>
      <li>Think of this camera as one orbiting its target position, or more imaginatively as a satellite orbiting the earth. Its position relative to the target ("Earth") can be set by three parameters:</li>
      <ul>
        <li>alpha (the longitudinal rotation, in radians),</li>
        <li>beta (the latitudinal rotation, in radians), and</li>
        <li>radius (the distance from the target).</li>
      </ul>
    </ul>    
  </div>
</template> 

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import {createScene, createCameras, setCameraCollision} from "./control/Camera.js";

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
    setCameraCollision(scene);

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