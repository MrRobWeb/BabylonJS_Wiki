import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

import {showAxis} from "./Axis";

export const createScene = (canvas, engine) => {

    const scene = new BABYLON.Scene(engine);  
    scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);

    // camera
    var camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(6, 8, -7));
    camera.attachControl(canvas, true);
    // lights
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(-1, 0.5, 0), scene);
    light.intensity = 0.8;

    var faceColors = [];
    faceColors[1] = BABYLON.Color3.Purple();

    var faceColors1 = [];
    faceColors1[1] = BABYLON.Color3.Red();

    var faceColors2 = [];
    faceColors2[1] = BABYLON.Color3.Green();

    var faceColors3 = [];
    faceColors3[1] = BABYLON.Color3.Blue();

    var box = BABYLON.MeshBuilder.CreateBox("Box", { faceColors: faceColors }, scene);
    var small1 = BABYLON.MeshBuilder.CreateBox("Small1", { width: 0.25, depth: 0.5, height: 0.75, faceColors: faceColors1 }, scene);
    var small2 = BABYLON.MeshBuilder.CreateBox("Small2", { width: 0.5, depth: 0.25, height: 1.25, faceColors: faceColors2 }, scene);
    var small3 = BABYLON.MeshBuilder.CreateBox("Small3", { width: 0.75, depth: 0.125, height: 2, faceColors: faceColors3 }, scene);
    
    // Setting Parent
    small1.parent = box;
    small2.setParent(box);
    box.addChild(small3);

    // Setting Transformations
    small1.position.y = 1;
    small2.position.y = 1;
    small3.position.y = 1;

    small1.rotation.x = Math.PI /2;
    small2.rotation.x = Math.PI /2;
    small3.rotation.x = Math.PI /2;

    box.position.x = 1;
    box.rotation.y = Math.PI / 4;

    showAxis(scene,4);

    scene.debugLayer.show()
    return scene;
}
