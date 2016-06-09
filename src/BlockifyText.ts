import * as _three from 'three';
import {Observable} from 'rx';
import {Block1x1} from 'mesh/Block1x1'
import {BlockMeshLoader} from 'mesh/BlockMeshLoader'
import {Block3dFontService} from 'service/Block3dFontService' 

/**
 * Main class for application
 */
export class BlockifyText {
    private static FONT_04b25 = 'assets/04b25_font.json';

    private width = 600;
    private height = 400;

    private mainRenderer:_three.WebGLRenderer;
    private mainScene:_three.Scene;
    private mainCamera:_three.Camera;

    constructor() {
        this.mainScene = new _three.Scene();

        this.mainCamera = new _three.PerspectiveCamera(75, this.width / this.height, 1, 10000);
        this.mainCamera.position.z = 150;
        this.mainRenderer = new _three.WebGLRenderer();
        this.mainRenderer.setSize(this.width, this.height);
        document.body.appendChild(this.mainRenderer.domElement);
        
        this.setupLights();

        var meshLoader = new BlockMeshLoader();
        var fontService = new Block3dFontService();

        Observable.zip(meshLoader.loadBlock3dData(), fontService.loadFontData(BlockifyText.FONT_04b25))
            .subscribe((result) => {
                var letter = fontService.generate3dLetter("a");

                this.mainScene.add(letter);
            });
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