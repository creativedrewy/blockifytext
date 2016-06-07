import * as _three from 'three';
import {Observable} from 'rx';

/**
 * 
 */
export class DataLoader {

    loadBlock3dData(): Observable<String> {
        return Observable.create<String>((subscriber) => {
            console.log(">> Got here");
            subscriber.onNext("hi");
            // var blockMeshLoader = new _three.JSONLoader();
            // blockMeshLoader.load('assets/block.json', (geometry, materials) => {

            //     subscriber.onNext("hi");
            // });
        });
    }

}