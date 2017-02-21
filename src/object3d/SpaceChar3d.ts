import { Letter3d } from './Letter3d';

/**
 * A "letter" that will render as space between other 3d letters
 */
export class SpaceChar3d extends Letter3d {
    public get blockWidth(): number { return 5; }

    constructor() {
        super({});
    }
}