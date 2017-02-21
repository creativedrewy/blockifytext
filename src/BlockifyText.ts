import { WordBuilder } from './object3d/WordBuilder';
import * as _three from 'three';
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
    private mainPhrase: WordBuilder;

    constructor() {
        this.sceneMain = new _three.Scene();

        this.cameraMain = new _three.PerspectiveCamera(75, this.width / this.height, 1, 10000);
        this.cameraMain.position.z = 250;

        this.rendererMain = new _three.WebGLRenderer({ antialias: true });
        this.rendererMain.shadowMapEnabled = true;
        this.rendererMain.shadowMap.type = _three.PCFSoftShadowMap;
        this.rendererMain.setSize(this.width, this.height);
        document.body.appendChild(this.rendererMain.domElement);
        
        this.setupLights();
        this.setupTextInteractions();
    }

    /**
     * Prepare the main phrase object and setup for typing
     */
    async setupTextInteractions() {
        var fontService = new Block3dFontService();
        this.mainPhrase = new WordBuilder(fontService);

        await fontService.loadFontData(BlockifyText.FONT_04b25);
        this.sceneMain.add(this.mainPhrase);

        document.body.onkeydown = (ev: KeyboardEvent) => {
            if (ev.keyCode == 8) {
                this.mainPhrase.deleteLastLetter();
            } else {
                this.mainPhrase.appendLetter(ev.key.toLowerCase());
            }
        }

        this.animateMainPhrase();
        this.typeFirstPhrase();
    }

    /**
     * Setup a subtle main phrase animation
     */
    animateMainPhrase() {
        var animDuration = 5;

        this.mainPhrase.rotation.x = -Math.PI / 30;
        this.mainPhrase.rotation.y = -Math.PI / 50;

        var timeline = new TimelineMax({ repeat: -1 });
        timeline.add(TweenLite.to(this.mainPhrase.rotation, animDuration, { x: Math.PI / 30, ease: Quad.easeInOut }));
        timeline.add(TweenLite.to(this.mainPhrase.rotation, animDuration, { y: Math.PI / 50, ease: Quad.easeInOut }));
        timeline.add(TweenLite.to(this.mainPhrase.rotation, animDuration, { x: -Math.PI / 30, ease: Quad.easeInOut }));
        timeline.add(TweenLite.to(this.mainPhrase.rotation, animDuration, { y: -Math.PI / 50, ease: Quad.easeInOut }));
    }

    /**
     * "Type in" an initial phrase to the scene
     */
    async typeFirstPhrase() {
        var firstWord = "type here";

        for (var i = 0; i < firstWord.length; i++) {
            this.mainPhrase.appendLetter(firstWord[i]);
            await new Promise<void>(resolve => setTimeout(resolve, 200));
        }
    }

    setupLights() {
        this.sceneMain.add(new _three.AmbientLight(0xaaaaaa, 0.7))

        var topLeft = new _three.PointLight(0xffffff, 0.4);
        topLeft.position.set(-250, 150, 150);
        topLeft.castShadow = true;
        topLeft.shadowMapWidth = 2048;
        topLeft.shadowMapHeight = 2048;
        this.sceneMain.add(topLeft);

        var bottomCenter = new _three.PointLight(0xaaaaaa, 0.4);
        bottomCenter.position.set(0, -150, 125);
        bottomCenter.castShadow = true;
        bottomCenter.shadowMapHeight = 2048;
        bottomCenter.shadowMapWidth = 2048;
        this.sceneMain.add(bottomCenter);

        var topRight = new _three.PointLight(0xaaaaaa, 0.3)
        topRight.position.set(300, 75, 150);
        topRight.castShadow = true;
        topRight.shadowMapHeight = 2048;
        topRight.shadowMapWidth = 2048;
        this.sceneMain.add(topRight);
    }

    run() {
        setInterval(() => {
            this.rendererMain.render(this.sceneMain, this.cameraMain);
        }, 33);
    }
}