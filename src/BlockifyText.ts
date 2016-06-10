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

    private rendererMain: _three.WebGLRenderer;
    private sceneMain: _three.Scene;
    private cameraMain: _three.Camera;
    private wordMain: _three.Object3D;

    constructor() {
        this.sceneMain = new _three.Scene();

        this.cameraMain = new _three.PerspectiveCamera(75, this.width / this.height, 1, 10000);
        this.cameraMain.position.z = 325;
        this.rendererMain = new _three.WebGLRenderer({ antialias: true });
        this.rendererMain.setSize(this.width, this.height);
        document.body.appendChild(this.rendererMain.domElement);
        
        this.setupLights();

        var meshLoader = new BlockMeshLoader();
        var fontService = new Block3dFontService();

        Observable.zip(meshLoader.loadBlock3dData(), fontService.loadFontData(BlockifyText.FONT_04b25))
            .subscribe((result) => {
                this.wordMain = fontService.generate3dWord("creativedrewy");
                this.sceneMain.add(this.wordMain);

                this.animateWord();
            });
    }

    animateWord() {
        this.wordMain.rotation.x = -Math.PI / 22;
        this.wordMain.rotation.y = -Math.PI / 40;
        this.wordMain.rotation.z = -Math.PI / 40;

        var timeline = new TimelineMax({ repeat: -1, yoyo: true });
        timeline.add(TweenLite.to(this.wordMain.rotation, 7, { x: Math.PI / 22, z: Math.PI / 40, ease: Quad.easeInOut }));
        timeline.add(TweenLite.to(this.wordMain.rotation, 7, { y: Math.PI / 40, ease: Quad.easeInOut }));
        timeline.add(TweenLite.to(this.wordMain.rotation, 7, { x: -Math.PI / 22, z: -Math.PI / 40, ease: Quad.easeInOut }));
        timeline.add(TweenLite.to(this.wordMain.rotation, 7, { y: -Math.PI / 40, ease: Quad.easeInOut }));
    }

    setupLights() {
        var light1 = new _three.PointLight(0xffffff, 1.0);
        light1.position.set(300, 200, -300);
        light1.castShadow = true;
        this.sceneMain.add(light1);

        var light2 = new _three.PointLight(0xffffff, 1.0);
        light2.position.set(-300, -200, -300);
        light2.castShadow = true;
        this.sceneMain.add(light2);

        var light3 = new _three.PointLight(0xffffff, 1.0);
        light3.position.set(-300, 200, 300);
        light3.castShadow = true;
        this.sceneMain.add(light3);

        var light4 = new _three.PointLight(0xffffff, 1.0);
        light4.position.set(300, -200, 300);
        light4.castShadow = true;
        this.sceneMain.add(light4);
    }

    run() {
        setInterval(() => {
            this.rendererMain.render(this.sceneMain, this.cameraMain);
        }, 50);
    }
}