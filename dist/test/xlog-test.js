"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tester = void 0;
const lib_1 = require("../lib/");
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
lib_1.configure("config/log4js.json");
class Tester {
    constructor(name) {
        lib_1.using(new lib_1.XLog(Tester.logger, lib_1.levels.INFO, 'ctor', 'name = %s', name), (log) => {
            // ...
        });
    }
    throwException(message) {
        lib_1.using(new lib_1.XLog(Tester.logger, lib_1.levels.DEBUG, 'throwException', 'message = %s', message), (log) => {
            throw new Error(message);
        });
    }
    doTestInternal(val) {
        return lib_1.using(new lib_1.XLog(Tester.logger, lib_1.levels.DEBUG, 'doTestInternal', 'val = %d', val), (log) => {
            if (log.isEnabled()) {
                log.log('value = %d', val); // log with same level as in XLog constructor if enabled
                log.log('test-for-missing-args');
            }
            this.throwException("exception tester"); // simulate exception
            return 2 * val;
        });
    }
    doTest(name) {
        return lib_1.using(new lib_1.XLog(Tester.logger, lib_1.levels.INFO, 'doTest', 'name = %s', name), (log) => {
            try {
                return this.doTestInternal(4711);
            }
            catch (exc) {
                log.error('Error: ', exc);
            }
        });
    }
}
exports.Tester = Tester;
Tester.logger = lib_1.getLogger('Tester');
class Tester2 {
    constructor() {
        lib_1.using(new lib_1.XLog(Tester2.logger, lib_1.levels.INFO, 'ctor'), (log) => {
            // ...
        });
    }
}
Tester2.logger = lib_1.getLogger('Tester2');
var tester = new Tester('Walter');
let val = tester.doTest('mein Test');
let tester2 = new Tester2();
//# sourceMappingURL=xlog-test.js.map