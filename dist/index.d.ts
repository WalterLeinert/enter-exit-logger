import { Logger, Level, levels } from 'log4js';

declare interface IDisposable {
    dispose();
} 

/**
 * Abstract base class for disposable resources
 */
declare abstract class Disposable {
    public dispose();
    protected onDispose();
}


/**
 * Logger for method entry, exit and arbitrary logs based on 
 * the disposable pattern.
 * 
 * @see {EnterExitLogger} works in conjunction with 
 * @see {using}.
 */
declare class MLogger extends Disposable {
    constructor(logger: Logger, level: Level, functionName: string, message?: string, ...args: any[]);

    public log(message: string, ...args: any[]): void; 

    public trace(message: string, ...args: any[]): void;
    public debug(message: string, ...args: any[]): void;
    public info(message: string, ...args: any[]): void;
    public warn(message: string, ...args: any[]): void;
    public error(message: string, ...args: any[]): void;
    public fatal(message: string, ...args: any[]): void;
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
declare function using<TDisposable extends IDisposable, TReturn>(
    disposable: TDisposable,
    closure: (disposable: TDisposable) => TReturn): TReturn;
    