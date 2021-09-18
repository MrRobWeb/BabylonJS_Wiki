import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

export const createScene = (canvas, engine) => {

    const scene = new BABYLON.Scene(engine);  

    const box = BABYLON.MeshBuilder.CreateBox("box", {})
    box.position.y=1

    const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 2;
    sphere.position.x = 2;
    
    BABYLON.MeshBuilder.CreateGround("ground", {height: 100, width: 100, subdivisions: 4});
    
    const camera = new BABYLON.UniversalCamera("FreeCamera", new BABYLON.Vector3(-15, 5, -15), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    scene.debugLayer.show()

    return scene;
}

export const createLights = (scene) => {
    
    new BABYLON.HemisphericLight("HemisphericLight", new BABYLON.Vector3(1, 1, 0));

    new BABYLON.PointLight("PointLight", new BABYLON.Vector3(5, 4, 15), scene);
    scene.getLightByName("PointLight").setEnabled(false);
    
    new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 0), scene);
    scene.getLightByName("DirectionalLight").setEnabled(false);

    new BABYLON.SpotLight("SpotLight", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), Math.PI / 3, 2, scene);
    scene.getLightByName("SpotLight").setEnabled(false);
    
}
