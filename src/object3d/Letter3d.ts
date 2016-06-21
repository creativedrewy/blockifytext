import * as _three from 'three';
import {Block1x1} from '../mesh/Block1x1'

/**
 * 3d object holding all the meshes and props for a block letter
 */
export class Letter3d extends _three.Object3D {
    private propsData: any;
    private letterBlocks: Array<Block1x1>;
    
    public get blockWidth(): number { return this.propsData.w; }
    public get blockHeight(): number { return this.propsData.px.length; }

    public get pxWidth(): number { return this.blockWidth * Block1x1.blockDimension; }
    public get pxHeight(): number { return this.blockHeight * Block1x1.blockDimension; }

    /**
     * Get the source data for a single position in the letter source data 
     */
    public getBlockSrc(x: number, y: number): number {
        return parseInt(this.propsData.px[x][y]);
    }

    /**
     * Add a block to the letter
     */
    public addBlock(block: Block1x1) {
        this.letterBlocks.push(block);
        this.add(block);
    }

    constructor(letterProps: any) {
        super();
        this.propsData = letterProps;
        this.letterBlocks = new Array();
    }
}