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
        this.mainCamera.position.z = 200;
        this.mainRenderer = new _three.WebGLRenderer();
        this.mainRenderer.setSize(this.width, this.height);
        document.body.appendChild(this.mainRenderer.domElement);
        
        this.setupLights();

        var blockMeshLoader = new _three.JSONLoader();
        blockMeshLoader.load('assets/block.json', (geometry, materials) => {
            var legoMesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color: 0xFF0000}));
            legoMesh.scale.set(10, 10, 10);
            legoMesh.rotation.x = Math.PI / 2;

            this.mainScene.add(legoMesh);
            
            var fontLoader = new _three.XHRLoader(_three.DefaultLoadingManager);
            fontLoader.load('assets/04b25_font.json', (res) => {
                var fontData = JSON.parse(res);
                
                
            })
        })
    }

    setupLights() {
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
    }

    run() {
        setInterval(() => {
            this.mainRenderer.render(this.mainScene, this.mainCamera);
        }, 50);
    }
}