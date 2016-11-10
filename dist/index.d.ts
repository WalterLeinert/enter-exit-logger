import { Logger, Level, levels } from 'log4js';

/**
 * Interface for disposable Resources
 */
declare interface IDisposable {
    /**
     * free resources
     */
    dispose();
}

/**
 * Abstract base class for disposable resources
 */
declare abstract class Disposable {
    /**
    * frees required resources
    */
    public dispose();

    /**
     * Will be called by @see {Disposable.dispose}.
     * Must be overridden in derived classes.
     */
    protected onDispose();
}


/**
 * Logger for method entry, exit and arbitrary logs based on 
 * the disposable pattern.
 * 
 * @see {XLog} works in conjunction with @see{using}.
 */
declare class XLog extends Disposable {
    constructor(logger: Logger, level: Level, functionName: string, message?: string, ...args: any[]);


    /**
     * logs a message for the current log level, which was set in constructor
     * @param {string} message - the log message
     * @param {any[]} args - arguments to format message
     */
    public log(message: string, ...args: any[]): void;

    /**
      * logs a message for log level @see{levels.TRACE}.
      * @param {string} message - the log message
      * @param {any[]} args - arguments to format message
      */
    public trace(message: string, ...args: any[]): void;

     /**
      * logs a message for log level @see{levels.DEBUG}.
      * @param {string} message - the log message
      * @param {any[]} args - arguments to format message
      */
    public debug(message: string, ...args: any[]): void;

     /**
      * logs a message for log level @see{levels.INFO}.
      * @param {string} message - the log message
      * @param {any[]} args - arguments to format message
      */
    public info(message: string, ...args: any[]): void;

     /**
      * logs a message for log level @see{levels.WARN}.
      * @param {string} message - the log message
      * @param {any[]} args - arguments to format message
      */
    public warn(message: string, ...args: any[]): void;

     /**
      * logs a message for log level @see{levels.ERROR}.
      * @param {string} message - the log message
      * @param {any[]} args - arguments to format message
      */
    public error(message: string, ...args: any[]): void;

     /**
      * logs a message for log level @see{levels.FATAL}.
      * @param {string} message - the log message
      * @param {any[]} args - arguments to format message
      */
    public fatal(message: string, ...args: any[]): void;
}


/**
 * Just like in C# this 'using' function will ensure the passed disposable is disposed when the closure has finished.
 *
 * Usage:
 * ```typescript
 * using(new DisposableObject(), (myObj) => {
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
