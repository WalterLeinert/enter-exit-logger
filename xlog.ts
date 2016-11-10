import { Disposable, IDisposable } from './disposable';
import { Logger, Level, levels } from 'log4js';

/**
 * Type of logging
 */
enum EnterExit {
    Enter = 0,      // method entry
    Exit,           // method exit
    Log             // regular log
}

/**
 * Logger for method entry, exit and arbitrary logs based on 
 * the disposable pattern.
 * 
 * @see {EnterExitLogger} works in conjunction with 
 * @see {using}.
 */
export class XLog extends Disposable {
    private static indentation = -1;

    static readonly EnterExitStrings: string[] = ['>> ', '<< ', '@  '];
    static readonly defaultIndentation = 2;
    static readonly maxIndentations = 30;
    static readonly indentationLevels = new Array<string>();
    private static initEnterExitLogger: boolean = XLog.initialize();

    private functionName: string;
    private level: Level;
    private logger: Logger;

    static initialize(): boolean {
        let indentString = '';
        for (let j = 0; j < XLog.defaultIndentation; j++) {
            indentString = indentString + ' ';
        }
        let indent = '';

        for (let i = 0; i < XLog.maxIndentations; i++) {
            // console.log('initialize: i = ' + i + ', indent = \'' + indent + '\'' );
            XLog.indentationLevels.push(indent);
            indent = indent + indentString;
        }

        return true;
    }

    /**
     * Initializes a new instance and triggers method entry log, update indentation
     * 
     * @param {log4js.Logger}: logger - the native logger
     * @param {log4js.Level}: level - the minimum log level
     * @param {string} functionName - the name of the method to be logged
     * @param {string} message - the message to belogged
     * @param {any[]} args - optional message arguments 
     */
    constructor(logger: Logger, level: Level = levels.INFO, functionName: string, message?: string, ...args: any[]) {
        super();
        this.logger = logger;
        this.level = level;
        this.functionName = functionName;

        XLog.indentation++;
        this.logInternal(EnterExit.Enter, this.level, message, ...args);
    }

    /**
     * triggers method exit log, update indentation
     */
    protected onDispose(): void {
        try {
            this.logInternal(EnterExit.Exit, this.level);
            XLog.indentation--;
        } finally {
            super.onDispose();
        }
    }

    /**
     * logs a message for the current log level, which was set in constructor
     */
    public log(message: string, ...args: any[]): void {
        this.logInternal(EnterExit.Log, this.level, message, args);
    }


    /**
     * logs a message for log level @see{levels.TRACE}.
     */
    public trace(message: string, ...args: any[]): void {
        this.logInternal(EnterExit.Log, levels.TRACE, message, args);
    }

    /**
     * logs a message for log level @see{levels.DEBUG}.
     */
    public debug(message: string, ...args: any[]): void {
        this.logInternal(EnterExit.Log, levels.DEBUG, message, args);
    }

    /**
    * logs a message for log level @see{levels.INFO}.
    */
    public info(message: string, ...args: any[]): void {
        this.logInternal(EnterExit.Log, levels.INFO, message, args);
    }

    /**
    * logs a message for log level @see{levels.WARN}.
    */
    public warn(message: string, ...args: any[]): void {
        this.logInternal(EnterExit.Log, levels.WARN, message, args);
    }

    /**
    * logs a message for log level @see{levels.ERROR}.
    */
    public error(message: string, ...args: any[]): void {
        this.logInternal(EnterExit.Log, levels.ERROR, message, args);
    }

    /**
    * logs a message for log level @see{levels.FATAL}.
    */
    public fatal(message: string, ...args: any[]): void {
        this.logInternal(EnterExit.Log, levels.FATAL, message, args);
    }

    /**
     * forwards different kind of log messages to @see {log4js}
     * 
     * @param {EnterExit} kind - kind of log message
     * @param {Level} level - log level
     * @param {string} message - log message
     * @param {any[]} ...args - additional log arguments 
     */
    private logInternal(kind: EnterExit, level: Level, message?: string, ...args: any[]): void {
        let indent = XLog.indentationLevels[XLog.indentation];
        let prefix = indent + XLog.EnterExitStrings[kind] + this.functionName;

        // prefix not empty message 
        if (message && message.length > 0) {
            prefix = prefix + ': ';
        }
        let prefixedMessage = prefix;

        if (message !== undefined) {
            prefixedMessage = prefix + message;
        }

        switch (level) {
            case levels.TRACE:
                this.logger.trace(prefixedMessage, ...args);
                break;
            case levels.DEBUG:
                this.logger.debug(prefixedMessage, ...args);
                break;
            case levels.INFO:
                this.logger.info(prefixedMessage, ...args);
                break;
            case levels.WARN:
                this.logger.warn(prefixedMessage, ...args);
                break;
            case levels.ERROR:
                this.logger.error(prefixedMessage, ...args);
                break;
            case levels.FATAL:
                this.logger.fatal(prefixedMessage, ...args);
                break;
            default:
                throw new Error('undefined log level: ' + level);
        }
    }

    /**
     * returns true, if the logger is enabled for the current level
     */
    public isEnabled(): boolean {
        return this.isEnabledFor(this.level);
    }

    public isTraceEnabled(): boolean {
        return this.logger.isTraceEnabled();
    }

    public isDebugEnabled(): boolean {
        return this.logger.isDebugEnabled();
    }

    public isInfoEnabled(): boolean {
        return this.logger.isInfoEnabled();
    }

    public isWarnEnabled(): boolean {
        return this.logger.isWarnEnabled();
    }

    public isErrorEnabled(): boolean {
        return this.logger.isErrorEnabled();
    }

    public isFatalEnabled(): boolean {
        return this.logger.isFatalEnabled();
    }

    /**
     * returns true, if the logger is enabled for the given level.
     * 
     * @param {Level} level - the log level to test
     */
    private isEnabledFor(level: Level): boolean {
        switch (level) {
            case levels.TRACE:
                return this.logger.isTraceEnabled();
            case levels.DEBUG:
                return this.logger.isDebugEnabled();
            case levels.INFO:
                return this.logger.isInfoEnabled();
            case levels.WARN:
                return this.logger.isWarnEnabled();
            case levels.ERROR:
                return this.logger.isErrorEnabled();
            case levels.FATAL:
                return this.logger.isFatalEnabled();
            default:
                throw new Error('undefined log level: ' + level);
        }
    }
}