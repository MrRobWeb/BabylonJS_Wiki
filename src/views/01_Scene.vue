<template>
  <div class="Scene">
    <h1>Scene Fundamentals</h1>
    <h2>Basic setup</h2>
    <ul>
      <li>canvas: The HTML "canvas" element is used to draw graphics, on the fly, via JavaScript.</li>
      <li>engine: Generate the BABYLON 3D engine, which basically draws the graphics in the canvas element</li>
      <li>scene: A scene is where all the contents will be displayed. We will create the different types of objects and add the same to the scene to make it visible on the screen. </li>
      <li>meshes: A mesh is represented shape of an object in the scene. We can create meshes BABYLON.Mesh.Create"..." or BABYLON.MeshBuilder."..."</li>
      <li>ground: A ground is a specific mesh created via BABYLON.MeshBuilder.CreateGround</li>
      <li>camera: A camera creates a perspective on the scene. Thus, we can have a look to it. There are many types of camera that can be used on Babylon.</li>
      <li>light: Lights are used to produce the diffuse and specular color received by each pixel. There are many types of lights.</li>
    </ul>
    
    <h2>Scene Explorer pane</h2>
    Babylon.js inspector is a visual debugging tool created to help pinpoint issues you may have with a scene.
    <a href="https://doc.babylonjs.com/toolsAndResources/tools/inspector">https://doc.babylonjs.com/toolsAndResources/tools/inspector</a> 
    <ul>
      <li>The scene explorer displays a hierarchical view of your scene. You can filter by name in the filter bar if you want to find a specific entry.</li>
      <li>By clicking on a line you will select it and the inspector will automatically update to reflect the properties of the selected item.</li>
      <li>Some entities offer shortcuts to contextual actions. </li>
    </ul>
    <h2>Inspector pane</h2>
    The inspector pane contains 4 tabs:
    <ul>
      <li>The property grid which will display configurable controls for the current selected entity:</li>
      <li>The debug pane will let you turn features on and off. It also let you display a grid and turn viewers (bones or physics) on and off:</li>
      <li>The statistics pane gives information about all metrics captured by the engine:</li>
      <li>The tools pane lets you access utilities (like screen capture or recording as well as several tools related to glTF):</li>
    </ul>
    <canvas id="renderCanvas1"/>
  </div>
</template>

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import {createScene} from "./control/Scene.js"

export default {
  name: 'Scene',
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