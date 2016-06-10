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

    private width = 900;
    private height = 400;

    private mainRenderer:_three.WebGLRenderer;
    private mainScene:_three.Scene;
    private mainCamera:_three.Camera;

    constructor() {
        this.mainScene = new _three.Scene();

        this.mainCamera = new _three.PerspectiveCamera(75, this.width / this.height, 1, 10000);
        this.mainCamera.position.z = 325;
        this.mainRenderer = new _three.WebGLRenderer();
        this.mainRenderer.setSize(this.width, this.height);
        document.body.appendChild(this.mainRenderer.domElement);
        
        this.setupLights();

        var meshLoader = new BlockMeshLoader();
        var fontService = new Block3dFontService();

        Observable.zip(meshLoader.loadBlock3dData(), fontService.loadFontData(BlockifyText.FONT_04b25))
            .subscribe((result) => {
                var word = fontService.generate3dWord("creativedrewy");
                this.mainScene.add(word);

                //TweenMax.to(word.rotation, 3, { z: Math.PI / 20 })
            });
    }

    setupLights() {
        var light1 = new _three.PointLight(0xffffff, 1.0);
        light1.position.set(300, 200, -300);
        light1.castShadow = true;
        this.mainScene.add(light1);

        var light2 = new _three.PointLight(0xffffff, 1.0);
        light2.position.set(-300, -200, -300);
        light2.castShadow = true;
        this.mainScene.add(light2);

        var light3 = new _three.PointLight(0xffffff, 1.0);
        light3.position.set(-300, 200, 300);
        light3.castShadow = true;
        this.mainScene.add(light3);

        var light4 = new _three.PointLight(0xffffff, 1.0);
        light4.position.set(300, -200, 300);
        light4.castShadow = true;
        this.mainScene.add(light4);
    }

    run() {
        setInterval(() => {
            this.mainRenderer.render(this.mainScene, this.mainCamera);
        }, 50);
    }
}