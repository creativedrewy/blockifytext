import * as _three from 'three';

export class BlockifyText {
    private width = 600;
    private height = 400;
    
    private mainRenderer:_three.WebGLRenderer;
    private mainScene:_three.Scene;
    private mainCamera:_three.Camera;
    
    constructor() {
        this.mainScene = new _three.Scene();
        
        this.mainCamera = new _three.PerspectiveCamera(75, this.width / this.height, 1, 10000);
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
        this.mainRenderer.setSize(this.width, this.height);

        document.body.appendChild(this.mainRenderer.domElement);
        
        var loader = new _three.JSONLoader();
        loader.load('assets/block.json', (geometry, materials) => {
            var legoMesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0xFF0000}));
            this.mainScene.add(legoMesh);
            
            var legoMesh2 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0xFF0000}));
            this.mainScene.add(legoMesh2);
            
            legoMesh2.position.x = 20;
            
            legoMesh.scale.set(10, 10, 10);
            legoMesh2.scale.set(10, 10, 10);
        })
    }
    
    run() {
        setInterval(() => {
            this.mainRenderer.render(this.mainScene, this.mainCamera);
        }, 33);
    }
}