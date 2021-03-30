"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const disposable_1 = require("../lib/disposable");
/**
 * Test for disposable pattern
 */
class Camera extends disposable_1.Disposable {
    constructor(manufacturer, model) {
        super();
        this.manufacturer = manufacturer;
        this.model = model;
        console.log('Camera.ctor: manufacturer = ' + manufacturer + ', model = ', model);
    }
    takePicture() {
        console.log('Camera.takePicture: simulating exception...');
        throw new Error("Test"); // simulate exception        
    }
    onDispose() {
        try {
            console.log('Camera.onDispose');
            // ...
        }
        finally {
            super.onDispose();
        }
    }
}
exports.Camera = Camera;
console.log('Test using/disposable pattern: works in case of exception');
try {
    disposable_1.using(new Camera('Sony', 'Alpha a6000'), (camera) => {
        camera.takePicture();
    });
}
catch (exc) {
    console.error("Exception expected: ", exc);
}
console.log();
console.log('Test double dispose: no check for double dispose');
let camera = new Camera('Nikon', 'COOLPIX S33 Waterproof ');
camera.dispose();
camera.dispose();
console.log();
console.log('Test double dispose: exception thrown on double dispose');
disposable_1.Disposable.throwExceptionOnAlreadyDisposed = true;
camera = new Camera('Canon', 'EOS 5D Mark IV');
camera.dispose();
try {
    camera.dispose();
}
catch (exc) {
    console.error("Exception expected: ", exc);
}
//# sourceMappingURL=disposable-test.js.map