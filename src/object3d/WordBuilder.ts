import { Letter3d } from './Letter3d';
import { Block3dFontService } from '../service/Block3dFontService';
import * as _three from 'three';

/**
 * A 3D obejct that creates a centered 3d word/phrase letter by letter
 */
export class WordBuilder extends _three.Object3D {
    private letterSpacing = 10;

    private fontService: Block3dFontService;
    private letterStash: Array<Letter3d>;
    private totalWidth = 0;

    constructor(svc: Block3dFontService) {
        super();

        this.fontService = svc;
        this.letterStash = new Array();
    }

    appendLetter(letter: string) {
        var newLetter = this.fontService.generate3dLetter(letter);
        this.add(newLetter);

        this.letterStash.push(newLetter);
        this.totalWidth += newLetter.pxWidth + this.letterSpacing;

        this.positionLetters();
    }

    deleteLastLetter() {
        if (this.letterStash.length > 0) {
            var removeLetter = this.letterStash.pop();

            this.totalWidth -= removeLetter.pxWidth + this.letterSpacing;
            this.remove(removeLetter);

            this.positionLetters();
        }
    }

    /**
     * Position all of the letters so that the word or phrase is centered
     */
    private positionLetters() {
        var xOffset = -(this.totalWidth / 2);

        this.letterStash.forEach(child => {
            child.position.x = xOffset;
            xOffset += child.pxWidth + this.letterSpacing;
        });
    }

}