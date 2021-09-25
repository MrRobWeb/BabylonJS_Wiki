import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

export const createScene = (canvas, engine) => {

    const scene = new BABYLON.Scene(engine);  

    const box = BABYLON.MeshBuilder.CreateBox("box", {size: 3});
    box.position.y = 1;

    const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 2;
    sphere.position.x = 4;
    
    BABYLON.MeshBuilder.CreateGround("ground", {height: 100, width: 100, subdivisions: 4});
    
    const arcRotateCamera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
    arcRotateCamera.setPosition(new BABYLON.Vector3(0, 17, -15));
    arcRotateCamera.attachControl(canvas, true);

    new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    scene.debugLayer.show()

    return scene;
}

export const createGUI = (scene) => {
    // 1. Full Screen GUI
    var fullScreenUI = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var button1 = GUI.Button.CreateSimpleButton("but1", "Click Me");
    button1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    button1.width = "150px"
    button1.height = "40px";
    button1.color = "white";
    button1.cornerRadius = 20;
    button1.background = "green";
    button1.onPointerUpObservable.add(function() {
        alert("you did it!");
    });
    fullScreenUI.addControl(button1);    

    // 2. GUI for a mesh plane 
    let sphere = scene.getMeshByName("sphere1");
    var plane = BABYLON.Mesh.CreatePlane("plane", 2);
    plane.parent = sphere;
    plane.position.y = 2;

    var meshUI = GUI.AdvancedDynamicTexture.CreateForMesh(plane);

    var button2 = GUI.Button.CreateSimpleButton("but1", "Click Me");
    button2.width = 1;
    button2.height = 0.4;
    button2.color = "white";
    button2.fontSize = 50;
    button2.background = "green";
    button2.onPointerUpObservable.add(function() {
        alert("you did it!");
    });
    meshUI.addControl(button2);

    // 3. GUI - label and track meshes in scene
    var boxLabel = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var rect1 = new GUI.Rectangle();
    rect1.width = 0.2;
    rect1.height = "40px";
    rect1.cornerRadius = 20;
    rect1.color = "Orange";
    rect1.thickness = 4;
    rect1.background = "green";
    boxLabel.addControl(rect1);
    let box = scene.getMeshByName("box");
    rect1.linkWithMesh(box);   
    rect1.linkOffsetY = -150;

    var label = new GUI.TextBlock();
    label.text = "Box";
    rect1.addControl(label);

    var target = new GUI.Ellipse();
    target.width = "40px";
    target.height = "40px";
    target.color = "Orange";
    target.thickness = 4;
    target.background = "green";
    boxLabel.addControl(target);
    target.linkWithMesh(box);   

    var line = new GUI.Line();
    line.lineWidth = 4;
    line.color = "Orange";
    line.y2 = 20;
    line.linkOffsetY = -20;
    boxLabel.addControl(line);
    line.linkWithMesh(box); 
    line.connectedControl = rect1;  
}