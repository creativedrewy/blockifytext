import * as _three from 'three';
import {Observable} from 'rx';

/**
 * Class to load the mesh data for a 1x1 3D block
 */
export class BlockMeshLoader {
    public static blockGeometry: _three.Geometry;

    /**
     * Load the block mesh data and save for later use
     */
    loadBlock3dData(): Observable<boolean> {
        return Observable.create<boolean>((subscriber) => {
            var blockMeshLoader = new _three.JSONLoader();

            blockMeshLoader.load('assets/block.json', (geometry, materials) => {
                BlockMeshLoader.blockGeometry = geometry;
                subscriber.onNext(true);
            });
        });
    }

}