import { Block3dFontService } from '../service/Block3dFontService';
import * as _three from 'three';

/**
 * 
 */
export class WordBuilder extends _three.Object3D {
    private fontService: Block3dFontService;

    constructor(svc: Block3dFontService) {
        super();

        this.fontService = svc;
    }

    appendLetter(letter: String) {

    }

    deleteLastLetter() {

    }
    
}