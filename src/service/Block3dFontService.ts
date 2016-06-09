import * as _three from 'three';
import {Observable} from 'rx';
import {Block1x1} from '../mesh/Block1x1'
import {Letter3d} from '../object3d/Letter3d'

/**
 * Encapsulates business logic related to a 3d font
 */
export class Block3dFontService { 
    private letterData: any;

    /**
     * Load the source data for a font
     */
    loadFontData(fontJson: string): Observable<boolean> {
        return Observable.create<boolean>((subscriber) => {
            var fontLoader = new _three.XHRLoader(_three.DefaultLoadingManager);
            fontLoader.load(fontJson, (res) => {
                this.letterData = JSON.parse(res);
                subscriber.onNext(true);
            });
        });
    }

    /**
     * Generate a 3d letter with all component blocks
     */
    generate3dLetter(letter: string): Letter3d {
        var letter3d = new Letter3d(this.letterData[letter]);
        
        var letterDisp = "";
        for (var i = 0; i < letter3d.blockHeight; i++) {
            for (var j = 0; j < letter3d.blockWidth; j++) {
                if (letter3d.getBlockSrc(i, j) == 1) {
                    var pxBlock = new Block1x1();
                    pxBlock.position.x = -(letter3d.pxWidth / 2) + (j * 10);
                    pxBlock.position.y = (letter3d.pxHeight / 2) - (i * 10);

                    letter3d.add(pxBlock);
                }
            }
        }

        return letter3d;
    }

    /**
     * Generate a 3d word with all of the 3d letters as one object
     */
    generate3dWord(word: string): _three.Object3D {
        var letterSpacing = 10;
        var spaceCharWidth = 50;
        var wordContainer = new _three.Object3D();

        var xOffset = 0;
        for (var i = 0; i < word.length; i++) {
            var letterChar = word[i];

            if (letterChar == " ") {
                xOffset += spaceCharWidth + letterSpacing;
            } else {
                var current3dLetter = this.generate3dLetter(letterChar);
                current3dLetter.position.x = xOffset;
                wordContainer.add(current3dLetter);

                xOffset += current3dLetter.pxWidth + letterSpacing;
            }
        }

        return wordContainer;
    }

}