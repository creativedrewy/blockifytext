import * as _three from 'three';
import {Letter3d} from 'Letter3d'

/**
 * 
 */
export class Sequence3d extends _three.Object3D {
    private charSequence: Array<Letter3d> = new Array();    //TODO: This will actually be generalized not just be a "letter"

    public get sequence(): Array<Letter3d> { return this.charSequence; }

    addToSequence(char: Letter3d) {
        this.add(char);

        this.charSequence.push(char);
    }
}