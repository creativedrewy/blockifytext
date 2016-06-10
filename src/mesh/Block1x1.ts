import {Mesh, Geometry} from 'three';
import {BlockMeshLoader} from 'BlockMeshLoader';

/**
 * Class representing an individual 3D block
 */
export class Block1x1 extends Mesh {
    constructor(blockColor: number = 0xff0000) {
        super(BlockMeshLoader.blockGeometry, new THREE.MeshPhongMaterial({ 
            color: blockColor, 
            shininess: 100,
            specular: 0x555555
        }));

        this.scale.set(5, 5, 5);
        this.rotation.x = Math.PI / 2;
    }
}