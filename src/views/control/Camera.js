import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

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
    
    BABYLON.MeshBuilder.CreateGround("ground", {height: 15, width: 15, subdivisions: 4});

    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    scene.debugLayer.show()

    return scene;
}
