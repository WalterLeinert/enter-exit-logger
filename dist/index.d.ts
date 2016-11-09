import { Logger, Level, levels } from 'log4js';

declare interface IDisposable {
    dispose();
} 

declare abstract class Disposable {
    public dispose();
    protected onDispose();
}

declare function using<TDisposable extends IDisposable, TReturn>(
    disposable: TDisposable,
    closure: (disposable: TDisposable) => TReturn): TReturn;

declare class MLogger {
    constructor(logger: Logger, level: Level, functionName: string, message?: string, ...args: any[]);

    public log(message: string, ...args: any[]): void; 

    public trace(message: string, ...args: any[]): void;
    public debug(message: string, ...args: any[]): void;
    public info(message: string, ...args: any[]): void;
    public warn(message: string, ...args: any[]): void;
    public error(message: string, ...args: any[]): void;
    public fatal(message: string, ...args: any[]): void;
}