import { SpaceChar3d } from '../object3d/SpaceChar3d';
import * as _three from 'three';
import {Block1x1} from '../mesh/Block1x1'
import {Letter3d} from '../object3d/Letter3d'

/**
 * Encapsulates business logic related to a 3d font
 */
export class Block3dFontService { 
    public blockColors: Array<number> = [ 0xfec400, 0xe76318, 0xde000d, 0xde378b, 0x0057a8, 0xffff99, 0xee9ec4, 0x87c0ea, 0xf49b00, 0x9c006b, 0x478cc6 ];

    private letterData: any;

    /**
     * Load the source data for a font
     */
    loadFontData(fontJson: string): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            var fontLoader = new _three.XHRLoader(_three.DefaultLoadingManager);
            fontLoader.load(fontJson, (res) => {
                this.letterData = JSON.parse(res);

                resolve(true);
            });
        });
    }

    /**
     * Generate a 3d letter with all component blocks
     */
    generate3dLetter(letter: string, color: number = 0xff0000): Letter3d {
        if (letter == " ") {
            var letter3d = new SpaceChar3d();
        } else {
            if (Object.keys(this.letterData).indexOf(letter) == -1) return null;

            var letter3d = new Letter3d(this.letterData[letter]);
            var letterDisp = "";
            for (var i = 0; i < letter3d.blockHeight; i++) {
                for (var j = 0; j < letter3d.blockWidth; j++) {
                    if (letter3d.getBlockSrc(i, j) == 1) {
                        var pxBlock = new Block1x1(color);
                        pxBlock.position.x = j * Block1x1.blockDimension;
                        pxBlock.position.y = (letter3d.pxHeight / 2) - (i * Block1x1.blockDimension);

                        letter3d.addBlock(pxBlock)
                    }
                }
            }
        }

        return letter3d;
    }
}