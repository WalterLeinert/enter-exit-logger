"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XLog = void 0;
const disposable_1 = require("./disposable");
const log4js_1 = require("log4js");
/**
 * Type of logging
 */
var EnterExit;
(function (EnterExit) {
    EnterExit[EnterExit["Enter"] = 0] = "Enter";
    EnterExit[EnterExit["Exit"] = 1] = "Exit";
    EnterExit[EnterExit["Log"] = 2] = "Log"; // regular log
})(EnterExit || (EnterExit = {}));
/**
 * Logger for method entry, exit and arbitrary logs based on
 * the disposable pattern.
 *
 * @see {EnterExitLogger} works in conjunction with
 * @see {using}.
 */
class XLog extends disposable_1.Disposable {
    /**
     * Initializes a new instance and triggers method entry log, update indentation
     *
     * @param {log4js.Logger}: logger - the native logger
     * @param {log4js.Level}: level - the minimum log level
     * @param {string} functionName - the name of the method to be logged
     * @param {string} message - the message to belogged
     * @param {any[]} args - optional message arguments
     */
    constructor(logger, level = log4js_1.levels.INFO, functionName, message, ...args) {
        super();
        this.logger = logger;
        this.level = level;
        this.functionName = functionName;
        XLog.indentation++;
        this.logInternal(EnterExit.Enter, this.level, message, ...args);
    }
    static initialize() {
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
     * triggers method exit log, update indentation
     */
    onDispose() {
        try {
            this.logInternal(EnterExit.Exit, this.level);
            XLog.indentation--;
        }
        finally {
            super.onDispose();
        }
    }
    /**
     * logs a message for the current log level, which was set in constructor
     */
    log(message, ...args) {
        this.logInternal(EnterExit.Log, this.level, message, ...args);
    }
    /**
     * logs a message for log level @see{levels.TRACE}.
     */
    trace(message, ...args) {
        this.logInternal(EnterExit.Log, log4js_1.levels.TRACE, message, ...args);
    }
    /**
     * logs a message for log level @see{levels.DEBUG}.
     */
    debug(message, ...args) {
        this.logInternal(EnterExit.Log, log4js_1.levels.DEBUG, message, ...args);
    }
    /**
    * logs a message for log level @see{levels.INFO}.
    */
    info(message, ...args) {
        this.logInternal(EnterExit.Log, log4js_1.levels.INFO, message, ...args);
    }
    /**
    * logs a message for log level @see{levels.WARN}.
    */
    warn(message, ...args) {
        this.logInternal(EnterExit.Log, log4js_1.levels.WARN, message, ...args);
    }
    /**
    * logs a message for log level @see{levels.ERROR}.
    */
    error(message, ...args) {
        this.logInternal(EnterExit.Log, log4js_1.levels.ERROR, message, ...args);
    }
    /**
    * logs a message for log level @see{levels.FATAL}.
    */
    fatal(message, ...args) {
        this.logInternal(EnterExit.Log, log4js_1.levels.FATAL, message, ...args);
    }
    /**
     * forwards different kind of log messages to @see {log4js}
     *
     * @param {EnterExit} kind - kind of log message
     * @param {Level} level - log level
     * @param {string} message - log message
     * @param {any[]} ...args - additional log arguments
     */
    logInternal(kind, level, message, ...args) {
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
            case log4js_1.levels.TRACE:
                this.logger.trace(prefixedMessage, ...args);
                break;
            case log4js_1.levels.DEBUG:
                this.logger.debug(prefixedMessage, ...args);
                break;
            case log4js_1.levels.INFO:
                this.logger.info(prefixedMessage, ...args);
                break;
            case log4js_1.levels.WARN:
                this.logger.warn(prefixedMessage, ...args);
                break;
            case log4js_1.levels.ERROR:
                this.logger.error(prefixedMessage, ...args);
                break;
            case log4js_1.levels.FATAL:
                this.logger.fatal(prefixedMessage, ...args);
                break;
            default:
                throw new Error('undefined log level: ' + level);
        }
    }
    /**
     * returns true, if the logger is enabled for the current level
     */
    isEnabled() {
        return this.isEnabledFor(this.level);
    }
    isTraceEnabled() {
        return this.logger.isTraceEnabled();
    }
    isDebugEnabled() {
        return this.logger.isDebugEnabled();
    }
    isInfoEnabled() {
        return this.logger.isInfoEnabled();
    }
    isWarnEnabled() {
        return this.logger.isWarnEnabled();
    }
    isErrorEnabled() {
        return this.logger.isErrorEnabled();
    }
    isFatalEnabled() {
        return this.logger.isFatalEnabled();
    }
    /**
     * returns true, if the logger is enabled for the given level.
     *
     * @param {Level} level - the log level to test
     */
    isEnabledFor(level) {
        switch (level) {
            case log4js_1.levels.TRACE:
                return this.logger.isTraceEnabled();
            case log4js_1.levels.DEBUG:
                return this.logger.isDebugEnabled();
            case log4js_1.levels.INFO:
                return this.logger.isInfoEnabled();
            case log4js_1.levels.WARN:
                return this.logger.isWarnEnabled();
            case log4js_1.levels.ERROR:
                return this.logger.isErrorEnabled();
            case log4js_1.levels.FATAL:
                return this.logger.isFatalEnabled();
            default:
                throw new Error('undefined log level: ' + level);
        }
    }
}
exports.XLog = XLog;
XLog.indentation = -1;
XLog.EnterExitStrings = ['>> ', '<< ', '@  '];
XLog.defaultIndentation = 2;
XLog.maxIndentations = 30;
XLog.indentationLevels = new Array();
XLog.initEnterExitLogger = XLog.initialize();
//# sourceMappingURL=xlog.js.map