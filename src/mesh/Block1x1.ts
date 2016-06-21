import * as _three from 'three';

/**
 * Class representing an individual 3D block
 */
export class Block1x1 extends _three.Object3D {
    public static blockDimension = 7.8;

    constructor(blockColor: number = 0xff0000) {
        super();
        // super(BlockMeshLoader.blockGeometry, new THREE.MeshPhongMaterial({ 
        //     color: blockColor, 
        //     shininess: 100,
        //     specular: 0xffffff
        // }));

        var boxGeom = new _three.BoxGeometry(Block1x1.blockDimension, 9.6, Block1x1.blockDimension);
        var newBox = new _three.Mesh(boxGeom, new _three.MeshPhongMaterial({ color: 0xff2200, specular: 0x444444, shininess: 100 }));
        newBox.position.y = 4.8;
        this.add(newBox);

        var cylGeom = new _three.CylinderGeometry(2.4, 2.4, 1.7, 30);
        var newCyl = new _three.Mesh(cylGeom, new _three.MeshPhongMaterial({ color: 0x00ff22, specular: 0x444444, shininess: 100 }))
        newCyl.position.y = 10.45;
        this.add(newCyl);

        this.castShadow = true;
        //this.scale.set(5, 5, 5);
        this.rotation.x = Math.PI / 2;
    }
}