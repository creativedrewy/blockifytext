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
        this.cameraMain.position.z = 250;

        this.rendererMain = new _three.WebGLRenderer({ 
            antialias: true,
            // alpha: true
        });
        this.rendererMain.shadowMapEnabled = true;
        this.rendererMain.shadowMap.type = _three.PCFSoftShadowMap;
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
        this.sceneMain.add(new _three.AmbientLight(0xffffff, 0.7))

        var topLeft = new _three.PointLight(0xaaaaaa, 0.4);
        topLeft.position.set(-250, 150, 150);
        topLeft.castShadow = true;
        topLeft.shadowMapWidth = 2048;
        topLeft.shadowMapHeight = 2048;
        this.sceneMain.add(topLeft);

        var bottomCenter = new _three.PointLight(0xaaaaaa, 0.4);
        bottomCenter.position.set(0, -150, 150);
        bottomCenter.castShadow = true;
        bottomCenter.shadowMapHeight = 2048;
        bottomCenter.shadowMapWidth = 2048;
        this.sceneMain.add(bottomCenter);

        var topRight = new _three.PointLight(0xaaaaaa, 0.4)
        topRight.position.set(250, 0, 300);
        // bottomCenter.castShadow = true;
        // bottomCenter.shadowMapHeight = 2048;
        // bottomCenter.shadowMapWidth = 2048;
    }

    run() {
        setInterval(() => {
            this.rendererMain.render(this.sceneMain, this.cameraMain);
        }, 50);
    }
}