"use strict";
var disposable_1 = require('../disposable');
var mlogger_1 = require('../mlogger');
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
log4js_1.configure("config/log4js.json");
// var logger: Logger = getLogger("Tester");
// logger.setLevel(levels.INFO);
var Tester = (function () {
    function Tester(name) {
        disposable_1.using(new mlogger_1.MLogger(Tester.logger, log4js_1.levels.INFO, 'ctor', 'name = %s', name), function (log) {
            // ...
        });
    }
    Tester.prototype.throwException = function (message) {
        disposable_1.using(new mlogger_1.MLogger(Tester.logger, log4js_1.levels.DEBUG, 'throwException', 'message = %s', message), function (log) {
            throw new Error(message);
        });
    };
    Tester.prototype.doTestInternal = function (val) {
        var _this = this;
        return disposable_1.using(new mlogger_1.MLogger(Tester.logger, log4js_1.levels.DEBUG, 'doTestInternal', 'val = %d', val), function (log) {
            log.log('value = %d', val);
            _this.throwException("exception tester"); // simulate exception
            return 2 * val;
        });
    };
    Tester.prototype.doTest = function (name) {
        var _this = this;
        return disposable_1.using(new mlogger_1.MLogger(Tester.logger, log4js_1.levels.INFO, 'doTest', 'name = %s', name), function (log) {
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
        disposable_1.using(new mlogger_1.MLogger(Tester2.logger, log4js_1.levels.INFO, 'ctor'), function (log) {
            // ...
        });
    }
    Tester2.logger = log4js_1.getLogger('Tester2');
    return Tester2;
}());
var tester = new Tester('Walter');
var val = tester.doTest('mein Test');
var tester2 = new Tester2();
//# sourceMappingURL=mlogger-test.js.map