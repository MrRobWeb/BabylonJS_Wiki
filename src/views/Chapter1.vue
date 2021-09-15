<template>
  <div class="Chapter1">
    <h1>Chapter1</h1>
    <canvas id="renderCanvas1"/>
  </div>
</template>

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

export default {
  name: 'Chapter1',
  components: {
    
  },
  mounted(){
    const canvas = document.getElementById("renderCanvas1"); // Get the canvas element
    const engine = new BABYLON.Engine(canvas, true);          // Generate the BABYLON 3D engine

    const createScene = function () {

        const scene = new BABYLON.Scene(engine);  

        // 1. Create your own meshes via "MeshBuilder"
        const box = BABYLON.MeshBuilder.CreateBox("box", {})
        box.position.y = 12;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        sphere.position.y = 12;
        sphere.position.x = 2;
        
        // Create basic ground
        BABYLON.MeshBuilder.CreateGround("ground", {height: 100, width: 100, subdivisions: 4});

        // 1. SceneLoader - Import model/object 

        // 1.1 Append/AppendAsync - Loads all babylon assets from a string and appends them to the scene 
        BABYLON.SceneLoader.Append("assets/", "house.obj", scene);

        // 1.2 ImportMesh/ImportMeshAsync - Loads the meshes from the file and appends them to the scene
        // BABYLON.SceneLoader.ImportMesh("","assets/", "house.obj", scene);
        
        // 1.3 LoadAssetContainer/LoadAssetContainerAsync - Loads all babylon assets from the file and does not append them to the scene
        // function addAllToScene appends to current scene -> before you can adjust imported meshes
        BABYLON.SceneLoader.LoadAssetContainer("assets/", "wooden watch tower2.obj",scene, function (container) {
          const watchTower = BABYLON.Mesh.MergeMeshes(container.meshes);
          watchTower.scaling.x = 3;
          watchTower.scaling.y = 3;
          watchTower.scaling.z = 3;
          watchTower.name = "watchTower";
          watchTower.position.x = 15;
          container.addAllToScene();
        });
        // 1.4 Load - Loads all babylon assets from the file and creates a new scene
        BABYLON.SceneLoader.Load("/assets/", "house.obj",engine, function(scene) {
          const camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -40), scene);
          // This targets the camera to scene origin
          camera.setTarget(BABYLON.Vector3.Zero());
          // This attaches the camera to the canvas
          camera.attachControl(canvas, true);
          new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        });

        // *** ArcRotatCamera
        // const camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 10, -40));
        // *** free camera (non-mesh)
        const camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -40), scene);
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

        return scene;
    };

    //Call the createScene function
    const scene = createScene(); 

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
</style>