import { Logger } from 'log4js';
/**
 * Interface for disposable Resources
 */
export interface IDisposable {
    /**
     * free resources
     */
    dispose(): void;
}
/**
 * Abstract base class for disposable resources
 */
export declare abstract class Disposable implements IDisposable {
    static logger: Logger;
    /** if true, throw Error on double dispose */
    static throwExceptionOnAlreadyDisposed: boolean;
    /** if true, log method entry/exit */
    static doMethodTraces: boolean;
    private disposed;
    /**
     * frees required resources
     */
    dispose(): void;
    /**
     * Will be called by @see {Disposable.dispose}.
     * Must be overridden in derived classes.
     */
    protected onDispose(): void;
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
export declare function using<TDisposable extends IDisposable, TReturn>(disposable: TDisposable, closure: (disposable: TDisposable) => TReturn): TReturn;
