<template>
  <div class="Chapter1">
    <h1>Chapter1</h1>
    <canvas id="renderCanvas"/>
  </div>
</template>

<script>
import * as BABYLON from "@babylonjs/core";
// import * as BLOADER from "@babylonjs/loaders";

export default {
  name: 'Chapter1',
  components: {
    
  },
  mounted(){
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
        const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

        // Add your code here matching the playground format
        const createScene = function () {
    
            const scene = new BABYLON.Scene(engine);  

            const box = BABYLON.MeshBuilder.CreateBox("box", {})
            box.position.y = 12;

            // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
            const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

            // Move the sphere upward 1/2 its height
            sphere.position.y = 12
            sphere.position.x = 2

            // *** ArcRotatCamera
            // const camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 10, -40));
            // *** free camera (non-mesh)
            const camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -40), scene);
            // This targets the camera to scene origin
            camera.setTarget(BABYLON.Vector3.Zero());
            // This attaches the camera to the canvas
            camera.attachControl(canvas, true);
            BABYLON.MeshBuilder.CreateGround("ground", {height: 50, width: 50, subdivisions: 4});

            BABYLON.SceneLoader.Append("assets/", "House.obj",scene);
            new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

            return scene;
        };

        const scene = createScene(); //Call the createScene function

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

#renderCanvas {
  width: 100%;
  height: 100%;
}
</style>