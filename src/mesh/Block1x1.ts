import {Mesh, Geometry} from 'three';
import {BlockMeshLoader} from 'BlockMeshLoader';

/**
 * Class representing an individual 3D block
 */
export class Block1x1 extends Mesh {
    constructor() {
        super(BlockMeshLoader.blockGeometry, new THREE.MeshPhongMaterial({ color: 0xFF0000 }));
        
        this.scale.set(5, 5, 5);
        this.rotation.x = Math.PI / 2;
    }
}