import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

export const addLayerMaskCamera = (canvas, scene) => {
    const layerMaskCamera = new BABYLON.FreeCamera("GunSightCamera", new BABYLON.Vector3(0, 10, -50), scene);  
    layerMaskCamera.setTarget(BABYLON.Vector3.Zero());    
    layerMaskCamera.attachControl(canvas, true);          
    layerMaskCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    layerMaskCamera.layerMask = 0x20000000;
    layerMaskCamera.viewport = new BABYLON.Viewport(0, 0, 1, 0.5);
    scene.activeCameras.push(layerMaskCamera);
    
    let meshes = [];
    let h = 250;
    let w = 250;
    
    let y = BABYLON.Mesh.CreateBox("y", h * .2, scene);
    y.scaling = new BABYLON.Vector3(0.05, 1, 1);
    y.position = new BABYLON.Vector3(0, 0, 0);
    meshes.push(y);
    
    let x = BABYLON.Mesh.CreateBox("x", h * .2, scene);
    x.scaling = new BABYLON.Vector3(1, 0.05, 1);
    x.position = new BABYLON.Vector3(0, 0, 0);
    meshes.push(x);
        
    let lineTop = BABYLON.Mesh.CreateBox("lineTop", w * .8, scene);
    lineTop.scaling = new BABYLON.Vector3(1, 0.005, 1);
    lineTop.position = new BABYLON.Vector3(0, h * 0.5, 0);
    meshes.push(lineTop);
    
    let lineBottom = BABYLON.Mesh.CreateBox("lineBottom", w * .8, scene);
    lineBottom.scaling = new BABYLON.Vector3(1, 0.005, 1);
    lineBottom.position = new BABYLON.Vector3(0, h * -0.5, 0);
    meshes.push(lineBottom);
    
    let lineLeft = BABYLON.Mesh.CreateBox("lineLeft", h, scene);
    lineLeft.scaling = new BABYLON.Vector3(0.010, 1,  1);
    lineLeft.position = new BABYLON.Vector3(w * -.4, 0, 0);
    meshes.push(lineLeft);
    
    let lineRight = BABYLON.Mesh.CreateBox("lineRight", h, scene);
    lineRight.scaling = new BABYLON.Vector3(0.010, 1,  1);
    lineRight.position = new BABYLON.Vector3(w * .4, 0, 0);
    meshes.push(lineRight);
    
    let gunSight = BABYLON.Mesh.MergeMeshes(meshes);
    gunSight.name = "gunSight";
    gunSight.layerMask = 0x20000000;
    gunSight.freezeWorldMatrix();
    
    let mat = new BABYLON.StandardMaterial("emissive mat",scene);
    mat.checkReadyOnlyOnce = true;
    mat.emissiveColor = new BABYLON.Color3(0,1,0);
    
    gunSight.material = mat;

    const box = BABYLON.MeshBuilder.CreateBox("box", {});
    box.position.y = 1;
    box.layerMask = 0x20000000;
}

export const createMultiView = (canvas, scene) => {
    
    const universalCamera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 15, -45), scene);
    universalCamera.setTarget(BABYLON.Vector3.Zero());
    universalCamera.attachControl(canvas, true);

    const arcRotateCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
    arcRotateCamera.setPosition(new BABYLON.Vector3(0, 17, -30));
    arcRotateCamera.attachControl(canvas, true);

    // Two Viewports
    universalCamera.viewport = new BABYLON.Viewport(0, 0.5, 1, 1);
    arcRotateCamera.viewport = new BABYLON.Viewport(0, 0, 1, 0.5);

    scene.activeCameras.push(universalCamera);
    scene.activeCameras.push(arcRotateCamera);

	

}



export const setCameraCollision = (scene) => {
    scene.gravity = new BABYLON.Vector3(0, -0.15, 0);
    scene.activeCamera.applyGravity = true;
    const assumedFramesPerSecond = 60;
    const earthGravity = -9.81;
    scene.gravity = new BABYLON.Vector3(0, earthGravity / assumedFramesPerSecond, 0);
    //Set the ellipsoid around the camera (e.g. your player's size)
    scene.activeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1); 
    // Enable Collisions
    scene.collisionsEnabled = true;
    scene.activeCamera.checkCollisions = true; 
    
    // checkCollisions 
    scene.meshes.forEach((mesh) => mesh.checkCollisions = true);
}

export const createCameras = (canvas, scene) => {
    

    // Parameters : name, position, scene
    const universalCamera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 2, -45), scene);

    // Targets the camera to a particular position. In this case the scene origin
    universalCamera.setTarget(BABYLON.Vector3.Zero());

    // Attach the camera to the canvas
    universalCamera.attachControl(canvas, true);

    const arcRotateCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
    arcRotateCamera.setPosition(new BABYLON.Vector3(0, 7, -30));
    arcRotateCamera.attachControl(canvas, true);

    /* 
    By default, panning with an ArcRotateCamera is also possible by using Ctrl + left mouse button. 
    You can use right mouse button instead by setting useCtrlForPanning to false in the attachControl call :

    camera.attachControl(canvas, noPreventDefault, useCtrlForPanning);

    If required, you can also totally deactivate panning by setting : 
    camera.panningSensibility = 0;
    */
    

    // Parameters: name, position, scene
    const followCamera = new BABYLON.FollowCamera("FollowCamera", new BABYLON.Vector3(0, 10, -10), scene);

    // The goal distance of camera from target
    followCamera.radius = 30;

    // The goal height of camera above local origin (centre) of target
    followCamera.heightOffset = 10;

    // The goal rotation of camera around local origin (centre) of target in x y plane
    followCamera.rotationOffset = 0;

    // Acceleration of camera in moving from current to goal position
    followCamera.cameraAcceleration = 0.005;

    // The speed at which acceleration is halted
    followCamera.maxCameraSpeed = 10;

    // This attaches the camera to the canvas
    followCamera.attachControl(canvas, true);

    
    /* Create Box for Follow Camera */
    // Shape to follow
    var box = BABYLON.MeshBuilder.CreateBox("box", {size: 2 }, scene);
    box.position = new BABYLON.Vector3(20, 0, 10);

    //box movement variables
    var alpha = 0;
    var orbit_radius = 20
        
    //Move the box to see that the camera follows it 	
    scene.registerBeforeRender(function () {
    alpha +=0.02;
    box.position.x = orbit_radius*Math.cos(alpha);
    box.position.y = orbit_radius*Math.sin(alpha);
    box.position.z = 10*Math.sin(2*alpha);
    
    //change the viewing angle of the camera as it follows the box
    followCamera.rotationOffset = (18*alpha)%360;
    });
    // NOTE:: SET CAMERA TARGET AFTER THE TARGET'S CREATION 
    // targetMesh created here.
    followCamera.lockedTarget = box; //version 2.5 onwards

    /* Create Box for Follow Camera */

    // Parameters: name, position, scene
    const flyCamera = new BABYLON.FlyCamera("FlyCamera", new BABYLON.Vector3(0, 5, -10), scene);

    // Airplane like rotation, with faster roll correction and banked-turns.
    // Default is 100. A higher number means slower correction.
    flyCamera.rollCorrect = 10;
    // Default is false.
    flyCamera.bankedTurn = true;
    // Defaults to 90° in radians in how far banking will roll the camera.
    flyCamera.bankedTurnLimit = Math.PI / 2;
    // How much of the Yawing (turning) will affect the Rolling (banked-turn.)
    // Less than 1 will reduce the Rolling, and more than 1 will increase it.
    flyCamera.bankedTurnMultiplier = 1;

    // This attaches the camera to the canvas
    flyCamera.attachControl(canvas, true);


    /**** Setting universalCamera as active one */
    scene.activeCamera = universalCamera;
}

export const createScene = (engine) => {

    const scene = new BABYLON.Scene(engine);  

    const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 2;
    
    BABYLON.MeshBuilder.CreateGround("ground", {height: 150, width: 150, subdivisions: 4});

    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    scene.debugLayer.show()

    return scene;
}
