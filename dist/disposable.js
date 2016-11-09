"use strict";
var log4js_1 = require('log4js');
/**
 * Abstract base class for disposable resources
 */
var Disposable = (function () {
    function Disposable() {
        this.disposed = false;
    }
    ;
    /**
     * frees required resources
     */
    Disposable.prototype.dispose = function () {
        //NOTE: EnterExitLogger not available due to recursion
        //using(new EnterExitLogger(Disposable.logger, levels.DEBUG, 'dispose'), (log) => {
        try {
            Disposable.logger.trace('>> dispose');
            if (this.disposed) {
                Disposable.logger.warn('Instance already disposed: ', this);
                if (Disposable.throwExceptionOnAlreadyDisposed) {
                    throw new Error('Instance already disposed: ' + JSON.stringify(this));
                }
            }
            else {
                this.onDispose();
            }
        }
        finally {
            Disposable.logger.trace('<< dispose');
            this.disposed = true;
        }
        //});
    };
    /**
     * Will be called by @see {Disposable.dispose}.
     * Must be overridden in derived classes.
     */
    Disposable.prototype.onDispose = function () {
    };
    Disposable.logger = log4js_1.getLogger("Disposable");
    Disposable.throwExceptionOnAlreadyDisposed = false;
    return Disposable;
}());
exports.Disposable = Disposable;
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