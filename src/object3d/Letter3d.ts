import * as _three from 'three';

/**
 * 3d object holding all the meshes and props for a block letter
 */
export class Letter3d extends _three.Object3D {
    private propsData: any;
    
    public get blockWidth(): number { return this.propsData.w; }
    public get blockHeight(): number { return this.propsData.px.length; }

    public get pxWidth(): number { return this.blockWidth * 10; }
    public get pxHeight(): number { return this.blockHeight * 10; }

    /**
     * 
     */
    public getBlockSrc(x: number, y: number): number {
        return parseInt(this.propsData.px[x][y]);
    }

    constructor(letterProps: any) {
        super();
        this.propsData = letterProps;
    }
}