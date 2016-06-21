import * as _three from 'three';

/**
 * Class representing an individual 3D block
 */
export class Block1x1 extends _three.Object3D {
    public static blockDimension = 7.8;

    constructor(blockColor: number = 0xff0000) {
        super();

        var boxGeom = new _three.BoxGeometry(Block1x1.blockDimension, 9.6, Block1x1.blockDimension);
        var newBox = new _three.Mesh(boxGeom, new _three.MeshPhongMaterial({ color: blockColor, specular: 0xcccccc, shininess: 100 }));
        newBox.position.y = 4.8;
        newBox.castShadow = true;
        newBox.receiveShadow = true;
        this.add(newBox);

        var cylGeom = new _three.CylinderGeometry(2.4, 2.4, 1.7, 30);
        var newCyl = new _three.Mesh(cylGeom, new _three.MeshPhongMaterial({ color: blockColor, specular: 0xcccccc, shininess: 100 }))
        newCyl.position.y = 10.45;
        newCyl.castShadow = true;
        newCyl.receiveShadow = true;
        this.add(newCyl);

        this.castShadow = true;
        this.receiveShadow = true;
        this.rotation.x = Math.PI / 2;
    }
}