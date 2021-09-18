import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

export const createScene = (canvas, engine) => {

    const scene = new BABYLON.Scene(engine);  

    // 1. Create your own meshes via "MeshBuilder"
    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.y = 1;

    // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
    const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 2;
    sphere.position.x = 2;
    
    // Create basic ground
    BABYLON.MeshBuilder.CreateGround("ground", {height: 100, width: 100, subdivisions: 4});
    
    // *** free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(-5, 5, -15), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    scene.debugLayer.show()

    return scene;
}
