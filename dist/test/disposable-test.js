"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var disposable_1 = require('../disposable');
/**
 * Test for disposable pattern
 */
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera(manufacturer, model) {
        _super.call(this);
        this.manufacturer = manufacturer;
        this.model = model;
        console.log('Camera.ctor: manufacturer = ' + manufacturer + ', model = ', model);
    }
    Camera.prototype.takePicture = function () {
        console.log('Camera.takePicture: simulating exception...');
        throw new Error("Test"); // simulate exception        
    };
    Camera.prototype.onDispose = function () {
        try {
            console.log('Camera.onDispose');
        }
        finally {
            _super.prototype.onDispose.call(this);
        }
    };
    return Camera;
}(disposable_1.Disposable));
exports.Camera = Camera;
console.log('Test using/disposable pattern: works in case of exception');
try {
    disposable_1.using(new Camera('Sony', 'Alpha a6000'), function (camera) {
        camera.takePicture();
    });
}
catch (exc) {
    console.error("Exception expected: ", exc);
}
console.log();
console.log('Test double dispose: no check for double dispose');
var camera = new Camera('Nikon', 'COOLPIX S33 Waterproof ');
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