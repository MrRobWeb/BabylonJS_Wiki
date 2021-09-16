<template>
  <div class="Chapter2">
    <h1>Chapter2</h1>
    <canvas id="renderCanvas"/>
  </div>
</template>

<script>
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

export default {
  name: 'Chapter2',
  components: {
    
  },
  mounted(){
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    const createScene = function () {

        const scene = new BABYLON.Scene(engine);  

        BABYLON.SceneLoader.LoadAssetContainer("assets/", "wooden watch tower2.obj",scene, function (container) {
          const watchTower = BABYLON.Mesh.MergeMeshes(container.meshes);
          watchTower.scaling.x = 3;
          watchTower.scaling.y = 3;
          watchTower.scaling.z = 3;
          console.log("house",watchTower);
          watchTower.name = "watchTower";
          watchTower.position.x = 15;
          const clonedWatchTower = watchTower.clone("watchTower");
          clonedWatchTower.position.x = -15;

          container.addAllToScene();
        });
        
        BABYLON.SceneLoader.LoadAssetContainer("assets/", "10446_Palm_Tree_v1_max2010_iteration-2.obj",scene, function (container) {
          const palm = BABYLON.Mesh.MergeMeshes(container.meshes);
          palm.name = "Palm";
          palm.rotation.x = -Math.PI / 2;
          palm.scaling.x = 0.03;
          palm.scaling.y = 0.03;
          palm.scaling.z = 0.03;
          const palm2 = palm.createInstance("Palm2");
          palm2.position.z = -12;
          palm2.position.x = 5;

          container.addAllToScene();
        });

        const camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 5, -40), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        BABYLON.MeshBuilder.CreateGround("ground", {height: 100, width: 100, subdivisions: 4});

        new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

        return scene;
    };

    const scene = createScene(); 

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