import { Logger, getLogger } from 'log4js';

/**
 * Interface for disposable Resources
 */
export interface IDisposable {
    /**
     * free resources
     */
    dispose();
}


/**
 * Abstract base class for disposable resources
 */
export abstract class Disposable implements IDisposable {
    static logger: Logger = getLogger("Disposable");
    static throwExceptionOnAlreadyDisposed = false;

    private disposed = false;;

    /**
     * frees required resources
     */
    dispose() {
        //NOTE: EnterExitLogger not available due to recursion
        //using(new EnterExitLogger(Disposable.logger, levels.DEBUG, 'dispose'), (log) => {
        try {
            Disposable.logger.trace('>> dispose');

            if (this.disposed) {
                Disposable.logger.warn('Instance already disposed: ', this);
                if (Disposable.throwExceptionOnAlreadyDisposed) {
                    throw new Error('Instance already disposed: ' + JSON.stringify(this));
                }
            } else {
                this.onDispose();
            }

        } finally {
            Disposable.logger.trace('<< dispose');
            this.disposed = true;
        }
        //});
    }

    /**
     * Will be called by @see {Disposable.dispose}.
     * Must be overridden in derived classes.
     */
    protected onDispose() {
    }
}


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
export function using<TDisposable extends IDisposable, TReturn>(
    disposable: TDisposable,
    closure: (disposable: TDisposable) => TReturn): TReturn {
    try {
        return closure(disposable);
    }
    finally {
        disposable.dispose();
    }
}
