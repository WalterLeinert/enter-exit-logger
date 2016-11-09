"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var disposable_1 = require('./disposable');
var log4js_1 = require('log4js');
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
var XLog = (function (_super) {
    __extends(XLog, _super);
    /**
     * Initializes a new instance and triggers method entry log, update indentation
     *
     * @param {log4js.Logger}: logger - the native logger
     * @param {log4js.Level}: level - the minimum log level
     * @param {string} functionName - the name of the method to be logged
     * @param {string} message - the message to belogged
     * @param {any[]} args - optional message arguments
     */
    function XLog(logger, level, functionName, message) {
        if (level === void 0) { level = log4js_1.levels.INFO; }
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        _super.call(this);
        this.logger = logger;
        this.level = level;
        this.functionName = functionName;
        XLog.indentation++;
        this.logInternal.apply(this, [EnterExit.Enter, this.level, message].concat(args));
    }
    XLog.initialize = function () {
        var indentString = '';
        for (var j = 0; j < XLog.defaultIndentation; j++) {
            indentString = indentString + ' ';
        }
        var indent = '';
        for (var i = 0; i < XLog.maxIndentations; i++) {
            // console.log('initialize: i = ' + i + ', indent = \'' + indent + '\'' );
            XLog.indentationLevels.push(indent);
            indent = indent + indentString;
        }
        return true;
    };
    /**
     * triggers method exit log, update indentation
     */
    XLog.prototype.onDispose = function () {
        try {
            this.logInternal(EnterExit.Exit, this.level);
            XLog.indentation--;
        }
        finally {
            _super.prototype.onDispose.call(this);
        }
    };
    /**
     * logs a message for the current log level, which was set in constructor
     */
    XLog.prototype.log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logInternal(EnterExit.Log, this.level, message, args);
    };
    /**
     * logs a message for log level @see{levels.TRACE}.
     */
    XLog.prototype.trace = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logInternal(EnterExit.Log, log4js_1.levels.TRACE, message, args);
    };
    /**
     * logs a message for log level @see{levels.DEBUG}.
     */
    XLog.prototype.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logInternal(EnterExit.Log, log4js_1.levels.DEBUG, message, args);
    };
    /**
    * logs a message for log level @see{levels.INFO}.
    */
    XLog.prototype.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logInternal(EnterExit.Log, log4js_1.levels.INFO, message, args);
    };
    /**
    * logs a message for log level @see{levels.WARN}.
    */
    XLog.prototype.warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logInternal(EnterExit.Log, log4js_1.levels.WARN, message, args);
    };
    /**
    * logs a message for log level @see{levels.ERROR}.
    */
    XLog.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logInternal(EnterExit.Log, log4js_1.levels.ERROR, message, args);
    };
    /**
    * logs a message for log level @see{levels.FATAL}.
    */
    XLog.prototype.fatal = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.logInternal(EnterExit.Log, log4js_1.levels.FATAL, message, args);
    };
    /**
     * forwards different kind of log messages to @see {log4js}
     *
     * @param {EnterExit} kind - kind of log message
     * @param {Level} level - log level
     * @param {string} message - log message
     * @param {any[]} ...args - additional log arguments
     */
    XLog.prototype.logInternal = function (kind, level, message) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var indent = XLog.indentationLevels[XLog.indentation];
        var prefix = indent + XLog.EnterExitStrings[kind] + this.functionName;
        // prefix not empty message 
        if (message && message.length > 0) {
            prefix = prefix + ': ';
        }
        var prefixedMessage = prefix;
        if (message !== undefined) {
            prefixedMessage = prefix + message;
        }
        switch (level) {
            case log4js_1.levels.TRACE:
                (_a = this.logger).trace.apply(_a, [prefixedMessage].concat(args));
                break;
            case log4js_1.levels.DEBUG:
                (_b = this.logger).debug.apply(_b, [prefixedMessage].concat(args));
                break;
            case log4js_1.levels.INFO:
                (_c = this.logger).info.apply(_c, [prefixedMessage].concat(args));
                break;
            case log4js_1.levels.WARN:
                (_d = this.logger).warn.apply(_d, [prefixedMessage].concat(args));
                break;
            case log4js_1.levels.ERROR:
                (_e = this.logger).error.apply(_e, [prefixedMessage].concat(args));
                break;
            case log4js_1.levels.FATAL:
                (_f = this.logger).fatal.apply(_f, [prefixedMessage].concat(args));
                break;
            default:
                throw new Error('undefined log level: ' + level);
        }
        var _a, _b, _c, _d, _e, _f;
    };
    XLog.indentation = -1;
    XLog.EnterExitStrings = ['>> ', '<< ', '@  '];
    XLog.defaultIndentation = 2;
    XLog.maxIndentations = 30;
    XLog.indentationLevels = new Array();
    XLog.initEnterExitLogger = XLog.initialize();
    return XLog;
}(disposable_1.Disposable));
exports.XLog = XLog;
//# sourceMappingURL=xlog.js.map