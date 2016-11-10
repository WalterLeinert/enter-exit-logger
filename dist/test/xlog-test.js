"use strict";
var disposable_1 = require('../disposable');
var xlog_1 = require('../xlog');
var log4js_1 = require('log4js');
/*
log4js.configure({
    appenders: [
        {
            type: "file",
            filename: "cheese.log",
            category: ['Tester', 'console'],
            // flags: "w"              // do not append
            levels: ['ERROR']
        },
        {
            type: "console",
            layout: {
                type: 'pattern',
                pattern: "%d{ISO8601} %[%-5p%] %[%-20c%] %m"
            }
        }
    ],
    replaceConsole: true
});
*/
//
// configure the logging system
//
log4js_1.configure("config/log4js.json");
var Tester = (function () {
    function Tester(name) {
        disposable_1.using(new xlog_1.XLog(Tester.logger, log4js_1.levels.INFO, 'ctor', 'name = %s', name), function (log) {
            // ...
        });
    }
    Tester.prototype.throwException = function (message) {
        disposable_1.using(new xlog_1.XLog(Tester.logger, log4js_1.levels.DEBUG, 'throwException', 'message = %s', message), function (log) {
            throw new Error(message);
        });
    };
    Tester.prototype.doTestInternal = function (val) {
        var _this = this;
        return disposable_1.using(new xlog_1.XLog(Tester.logger, log4js_1.levels.DEBUG, 'doTestInternal', 'val = %d', val), function (log) {
            if (log.isEnabled()) {
                log.log('value = %d', val); // log with same level as in XLog constructor if enabled
            }
            _this.throwException("exception tester"); // simulate exception
            return 2 * val;
        });
    };
    Tester.prototype.doTest = function (name) {
        var _this = this;
        return disposable_1.using(new xlog_1.XLog(Tester.logger, log4js_1.levels.INFO, 'doTest', 'name = %s', name), function (log) {
            try {
                return _this.doTestInternal(4711);
            }
            catch (exc) {
                log.error('Error: ', exc);
            }
        });
    };
    Tester.logger = log4js_1.getLogger('Tester');
    return Tester;
}());
exports.Tester = Tester;
var Tester2 = (function () {
    function Tester2() {
        disposable_1.using(new xlog_1.XLog(Tester2.logger, log4js_1.levels.INFO, 'ctor'), function (log) {
            // ...
        });
    }
    Tester2.logger = log4js_1.getLogger('Tester2');
    return Tester2;
}());
var tester = new Tester('Walter');
var val = tester.doTest('mein Test');
var tester2 = new Tester2();
//# sourceMappingURL=xlog-test.js.map