import {Mesh, Geometry} from 'three';

/**
 * 
 */
export class Block1x1 extends Mesh {
    constructor(geometry: Geometry) {
        super(geometry, new THREE.MeshPhongMaterial({color: 0xFF0000}));
        
        this.scale.set(10, 10, 10);
        this.rotation.x = Math.PI / 2;
    }
}