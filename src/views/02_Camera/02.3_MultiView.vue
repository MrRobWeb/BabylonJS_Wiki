<template>
  <div>
    <h1>Multiview</h1>
    <canvas id="renderCanvas1"/>
    <hr>
    <a href="https://doc.babylonjs.com/divingDeeper/cameras/multiViewsPart2">https://doc.babylonjs.com/divingDeeper/cameras/multiViewsPart2</a>
    <h2>Active Cameras</h2>
    <ul>
      <li>Babylon.js can render multiple views of the same scene.</li>
      <ul>
        <li>scene.activeCameras.push(camera);</li>
        <li>scene.activeCameras.push(camera2);</li>
      </ul>
    </ul>
    <h2>Viewports</h2>
    <ul>
      <li>If you want to use many cameras, you will need to specify a viewport for each camera:</li>
      <ul>
        <li>camera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 1.0);</li>
        <li>camera2.viewport = new BABYLON.Viewport(0, 0, 0.5, 1.0);</li>
        <li>BABYLON.Viewport = function (x, y, width, height);</li>
        <li>where x, y, are the lower lefthand corner of the viewport followed by its width and height. Values for x, y, width, and height are numbers between 0 and 1 representing the fraction of the screen width and height, respectively.</li>
      </ul>
    </ul>
    <h2>Layer Masks - Hide or make meshes visible</h2>
    <p>
      layerMask is a value that can be assigned to different objects (like meshes, cameras, layers, particle systems, etc) 
      and is used to determine the visibility of this object from another one 
      (for eg, if a mesh is visible from a camera or if a layer should be displayed after a given camera is processed).
    </p>
    <p>The only two things to understand with layerMask are that:</p>
    <ul>
        <li>it can be any number from 0 to 0xFFFFFFFF (or 4294967295, but it’s easier to write 0xFFFFFFFF)</li>
        <li>when computing a visibility flag, two values of layerMask are ANDed and if the result is different from 0 the flag is true</li>
    </ul>
    <p>
      So, for eg, if camera.layerMask = 35 and mesh.layerMask = 2, 35 & 2 == 2 != 0 so the mesh is visible from this camera. 
      We often show these numbers in hexadecimal because doing the AND as a mental calculation is easier that way: 
      35=0x23 and 2=0x02 and 35 & 2 == 0x23 & 0x02 and from this latter representation it’s easier to see that the result is 2 
      (well, at least when you are a bit comfortable with hexadecimal!).
    </p>
    <h3>Default Layer mask and Usage in Babylon.js</h3>
    <p>
      In Babylon, by default all layerMask properties are 0x0FFFFFFF (for Camera, Mesh, Layer, …). So, when it comes to determine a visibility, 0x0FFFFFFF & 0x0FFFFFFF != 0 and everything is always visible (at least from the standpoint of the layerMask test).
    </p>
    <p>
      As you can see, there are 4 bits not set by default in the layerMask (the leading 0 before the first F). 
      It’s to ease the use of layerMask, as a common usage is to make some meshes hidden from a camera. To achieve that, you need 
      to set a layerMask on the meshes so that the AND operation with the layerMask of the camera (0x0FFFFFFF by default) is 0: 
      you can use 0x10000000, 0x20000000, 0x40000000 or 0x80000000. Now you see why showing these numbers in hexadecimal helps: 
      it’s a lot easier to see that 0x10000000 & 0x0FFFFFFF = 0 than 268435456 & 268435455!
    </p>
  </div>
</template> 

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import {createScene, setCameraCollision, createMultiView, addLayerMaskCamera} from "../control/02_Camera.js";

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

    createMultiView(canvas, scene);
    addLayerMaskCamera(canvas, scene);
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

p {
    text-align: left;
}
</style>