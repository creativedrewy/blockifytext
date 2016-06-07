import * as _three from 'three';

export class BlockifyText {
    private mainRenderer:_three.WebGLRenderer;
    private mainScene:_three.Scene;
    private mainCamera:_three.Camera;
    
    constructor() {
        this.mainScene = new _three.Scene();
        
        this.mainCamera = new _three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        this.mainCamera.position.z = 100;
        
        var spotLight = new _three.SpotLight(0xffffff);
        spotLight.position.set(50, 50, 50);
        spotLight.castShadow = true;
        spotLight.intensity = 1.0;
        this.mainScene.add(spotLight);
        
        var spotLight = new _three.SpotLight(0xffffff);
        spotLight.position.set(-50, -50, 50);
        spotLight.castShadow = true;
        spotLight.intensity = 1.0;
        this.mainScene.add(spotLight);
        
        this.mainRenderer = new _three.WebGLRenderer();
        this.mainRenderer.setSize(600, 400);

        document.body.appendChild(this.mainRenderer.domElement);
     
        this.mainRenderer.render(this.mainScene, this.mainCamera);
    }
}