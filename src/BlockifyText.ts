import * as _three from 'three';
import {Observable} from 'rx';
import {Block1x1} from 'mesh/Block1x1'
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
        this.cameraMain.position.z = 100;
        this.cameraMain.lookAt(new _three.Vector3(0, 0, 0))
        this.rendererMain = new _three.WebGLRenderer({ antialias: true });
        this.rendererMain.setSize(this.width, this.height);
        document.body.appendChild(this.rendererMain.domElement);
        
        this.setupLights();

        var fontService = new Block3dFontService();

        fontService.loadFontData(BlockifyText.FONT_04b25)
            .subscribe((result) => {
                this.wordMain = fontService.generate3dWord("a");
                this.sceneMain.add(this.wordMain);

                //this.animateWord();
            });
    }

    animateWord() {
        var animDuration = 3;

        this.wordMain.rotation.x = -Math.PI / 22;
        this.wordMain.rotation.y = -Math.PI / 40;
        this.wordMain.rotation.z = -Math.PI / 40;

        var timeline = new TimelineMax({ repeat: -1 });
        timeline.add(TweenLite.to(this.wordMain.rotation, animDuration, { x: Math.PI / 22, z: Math.PI / 40, ease: Quad.easeInOut }));
        timeline.add(TweenLite.to(this.wordMain.rotation, animDuration, { y: Math.PI / 40, ease: Quad.easeInOut }));
        timeline.add(TweenLite.to(this.wordMain.rotation, animDuration, { x: -Math.PI / 22, z: -Math.PI / 40, ease: Quad.easeInOut }));
        timeline.add(TweenLite.to(this.wordMain.rotation, animDuration, { y: -Math.PI / 40, ease: Quad.easeInOut }));
    }

    setupLights() {
        var light1 = new _three.PointLight(0xffffff, 1.0);
        light1.position.set(40, 100, 75);
        //light1.castShadow = true;
        this.sceneMain.add(light1);

        var lightTest = new _three.PointLight(0xffffff, 1.0)
        lightTest.position.set(0, 0, 0)
        light1.castShadow = true;
        this.sceneMain.add(lightTest)

        //var light2 = new _three.DirectionalLight(0xffffff, 1.0);
        //light2.position.set(0, 0, 400);
        //light2.castShadow = true;
        //this.sceneMain.add(light2);

        // var light3 = new _three.PointLight(0xffffff, 1.0);
        // light3.position.set(-600, -400, 300);
        // light3.castShadow = true;
        // this.sceneMain.add(light3);

        // var light4 = new _three.PointLight(0xffffff, 1.0);
        // light4.position.set(-600, 400, 300);
        // light4.castShadow = true;
        // this.sceneMain.add(light4);

        this.sceneMain.add(new _three.PointLightHelper(light1, 30));
        this.sceneMain.add(new _three.PointLightHelper(lightTest, 10));
        //this.sceneMain.add(new _three.PointLightHelper(lightTest, 30));
        // this.sceneMain.add(new _three.PointLightHelper(light2, 30));
        // this.sceneMain.add(new _three.PointLightHelper(light3, 30));
        // this.sceneMain.add(new _three.PointLightHelper(light4, 30));
    }

    run() {
        setInterval(() => {
            this.rendererMain.render(this.sceneMain, this.cameraMain);
        }, 50);
    }
}