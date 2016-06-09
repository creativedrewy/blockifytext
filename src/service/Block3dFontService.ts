import * as _three from 'three';
import {Observable} from 'rx';
import {Block1x1} from '../mesh/Block1x1'

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
    generate3dLetter(letter: string): _three.Object3D {
        var container = new _three.Object3D;

        var letterProps: any = this.letterData[letter];
        var letterWidth = letterProps.w;
        var letterSizeW = letterProps.w * 10;
        var letterSizeH = letterProps.px.length * 10;
                    
        var letterDisp = "";
        for (var i = 0; i < letterProps.px.length; i++) {
            var currentLine = "";
            for (var j = 0; j < letterProps.px[i].length; j++) {
                currentLine += letterProps.px[i][j] == 0 ? ":" : "#";

                if (letterProps.px[i][j] == 1) {
                    var pxBlock = new Block1x1();
                    pxBlock.position.x = -(letterSizeW / 2) + (j * 10);
                    pxBlock.position.y = (letterSizeH / 2) - (i * 10);

                    container.add(pxBlock);
                }
            }
            
            console.log(i + " " + currentLine);
        }

        return container;
    }

}