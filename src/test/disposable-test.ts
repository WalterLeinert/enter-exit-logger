import { Disposable, using } from '../lib/disposable';

/**
 * Test for disposable pattern
 */
export class Camera extends Disposable {

    constructor(public manufacturer: string, public model: string) {
        super();
        console.log('Camera.ctor: manufacturer = ' + manufacturer + ', model = ', model);
    }

    public takePicture() {
        console.log('Camera.takePicture: simulating exception...')
        throw new Error("Test");    // simulate exception        
    }

    protected onDispose() {
        try {
            console.log('Camera.onDispose')
            // ...
        } finally {
            super.onDispose();
        }
    }
}


console.log('Test using/disposable pattern: works in case of exception');
try {
    using(new Camera('Sony', 'Alpha a6000'), (camera) => {
        camera.takePicture();
    });
} catch (exc) {
    console.error("Exception expected: ", exc);
}

console.log();
console.log('Test double dispose: no check for double dispose');
let camera = new Camera('Nikon', 'COOLPIX S33 Waterproof ');
camera.dispose();
camera.dispose();

console.log();
console.log('Test double dispose: exception thrown on double dispose');
Disposable.throwExceptionOnAlreadyDisposed = true;
camera = new Camera('Canon', 'EOS 5D Mark IV');
camera.dispose();

try {
   camera.dispose();
} catch (exc) {
    console.error("Exception expected: ", exc);
}