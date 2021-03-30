"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.using = exports.Disposable = void 0;
const log4js_1 = require("log4js");
/**
 * Abstract base class for disposable resources
 */
class Disposable {
    constructor() {
        this.disposed = false;
    }
    ;
    /**
     * frees required resources
     */
    dispose() {
        //NOTE: EnterExitLogger not available due to recursion
        //using(new EnterExitLogger(Disposable.logger, levels.DEBUG, 'dispose'), (log) => {
        try {
            if (Disposable.doMethodTraces) {
                Disposable.logger.trace('>> dispose');
            }
            if (this.disposed) {
                if (Disposable.throwExceptionOnAlreadyDisposed) {
                    throw new Error('Instance already disposed: ' + JSON.stringify(this));
                }
                else {
                    Disposable.logger.warn('Instance already disposed: ', this);
                }
            }
            else {
                this.onDispose();
            }
        }
        finally {
            if (Disposable.doMethodTraces) {
                Disposable.logger.trace('<< dispose');
            }
            this.disposed = true;
        }
        //});
    }
    /**
     * Will be called by @see {Disposable.dispose}.
     * Must be overridden in derived classes.
     */
    onDispose() {
    }
}
exports.Disposable = Disposable;
Disposable.logger = log4js_1.getLogger("Disposable");
/** if true, throw Error on double dispose */
Disposable.throwExceptionOnAlreadyDisposed = false;
/** if true, log method entry/exit */
Disposable.doMethodTraces = false;
/**
 * Just like in C# this 'using' function will ensure the passed disposable is disposed when the closure has finished.
 *
 * Usage:
 * ```typescript
 * using(new DisposableObject(), (myObj)=>{
 *   // do work with myObj
 * });
 * // myObj automatically has it's dispose method called.
 * ```
 * from https://github.com/electricessence/TypeScript.NET
 *
 * @param {TDisposable} disposable - disposable resource
 * @param {(disposable: TDisposable)} - closure Function call to execute.
 * @returns {TReturn} Returns whatever the closure's return value is.
 */
function using(disposable, closure) {
    try {
        return closure(disposable);
    }
    finally {
        disposable.dispose();
    }
}
exports.using = using;
//# sourceMappingURL=disposable.js.map