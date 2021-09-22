import { expect } from 'chai';

import { Disposable, using } from '../lib';

/**
 * Test for disposable pattern
 */
export class Camera extends Disposable {

    constructor(public manufacturer: string, public model: string) {
        super();
        // console.log('Camera.ctor: manufacturer = ' + manufacturer + ', model = ', model);
    }

    public takePicture() {
        // console.log('Camera.takePicture: simulating exception...')
        throw new Error("Test-Exception");    // simulate exception        
    }

    protected onDispose() {
        try {
            // console.log('Camera.onDispose')
            // ...
        } finally {
            super.onDispose();
        }
    }
}


describe("using/disposable pattern", () => {
    it("should work in case of exception", () => {
        expect(() =>
            using(new Camera('Sony', 'Alpha a6000'), (camera) => {
                camera.takePicture();
            })
        ).to.throw('Test-Exception');
    });

    it("should not check for double dispose", () => {
        const camera = new Camera('Nikon', 'COOLPIX S33 Waterproof ');
        camera.dispose();
        camera.dispose();
    });

    it("should throw exception on double dispose", () => {
        Disposable.throwExceptionOnAlreadyDisposed = true;
        const camera1 = new Camera('Canon', 'EOS 5D Mark IV');
        camera1.dispose();

        expect(() => camera1.dispose()).to.throw('Instance already disposed');
    });
});