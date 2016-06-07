import * as _three from 'three';
import {Block1x1} from 'mesh/Block1x1'

/**
 * 
 */
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
        this.mainRenderer = new _three.WebGLRenderer();
        this.mainRenderer.setSize(this.width, this.height);
        document.body.appendChild(this.mainRenderer.domElement);
        
        this.setupLights();

        var blockMeshLoader = new _three.JSONLoader();
        blockMeshLoader.load('assets/block.json', (geometry, materials) => {
            var singleBlock = new Block1x1(geometry);
            //this.mainScene.add(singleBlock);
            
            var fontLoader = new _three.XHRLoader(_three.DefaultLoadingManager);
            fontLoader.load('assets/04b25_font.json', (res) => {
                var fontData = JSON.parse(res);
                
                var letterProps = fontData.b;   //Play around with data for letter a
                var letterWidth = letterProps.w;
                
                var letterDisp = "";
                for (var i = 0; i < letterProps.px.length; i++) {
                    var currentLine = "";
                    for (var j = 0; j < letterProps.px[i].length; j++) {
                        currentLine += letterProps.px[i][j] == 0 ? ":" : "#";

                        if (letterProps.px[i][j] == 1) {
                            var pxBlock = new Block1x1(geometry);
                            pxBlock.position.x = j * 10;
                            pxBlock.position.y = i * -10;

                            this.mainScene.add(pxBlock);
                        }
                    }
                    
                    console.log(currentLine);
                }
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