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
        //this.cameraMain.position.z = 1000;
        this.cameraMain.position.z = 250;
        this.cameraMain.lookAt(new _three.Vector3(0, 0, 0))
        this.rendererMain = new _three.WebGLRenderer({ 
            antialias: true, 
            // alpha: true
        });
        this.rendererMain.setSize(this.width, this.height);
        document.body.appendChild(this.rendererMain.domElement);
        
        this.setupLights();

        var fontService = new Block3dFontService();

        fontService.loadFontData(BlockifyText.FONT_04b25)
            .subscribe((result) => {
                this.wordMain = fontService.generate3dWord("creativedrewy");
                this.sceneMain.add(this.wordMain);

                this.animateWord();
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
        var topLeft = new _three.SpotLight(0xaaaaaa, 1.5, 0.0, Math.PI / 6, 1, 2)
        topLeft.position.set(-600, 600, 400);
        topLeft.castShadow = true;
        topLeft.shadow.mapSize.width = 1024;
        topLeft.shadow.mapSize.height = 1024;
        this.sceneMain.add(topLeft);
        this.sceneMain.add(new _three.SpotLightHelper(topLeft, 30, 200));

        var topRight = new _three.SpotLight(0xaaaaaa, 1.0, 0.0, Math.PI / 6, 1, 2)
        topRight.position.set(600, 600, 400);
        topRight.castShadow = true;
        topRight.shadow.mapSize.width = 1024;
        topRight.shadow.mapSize.height = 1024;
        this.sceneMain.add(topRight);
        this.sceneMain.add(new _three.SpotLightHelper(topRight, 30, 200));

        var bottomCenter = new _three.PointLight(0xaaaaaa, 1.0);
        bottomCenter.position.set(0, -50, 40);
        bottomCenter.castShadow = true;
        bottomCenter.shadow.mapSize.width = 1024;
        bottomCenter.shadow.mapSize.height = 1024;
        this.sceneMain.add(bottomCenter);
    }

    run() {
        setInterval(() => {
            this.rendererMain.render(this.sceneMain, this.cameraMain);
        }, 50);
    }
}