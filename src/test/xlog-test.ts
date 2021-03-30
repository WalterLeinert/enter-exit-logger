import { using, XLog, Logger, getLogger, levels, configure   } from '../lib/';

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
configure("config/log4js.json");

export class Tester {
    private static logger = getLogger('Tester');

    constructor(name: string) {
        using(new XLog(Tester.logger, levels.INFO, 'ctor', 'name = %s', name), (log) => {
            // ...
        });
    }

    private throwException(message: string) {
        using(new XLog(Tester.logger, levels.DEBUG, 'throwException', 'message = %s', message), (log) => {
            throw new Error(message);
        });
    }

    private doTestInternal(val: number): number {
        return using(new XLog(Tester.logger, levels.DEBUG, 'doTestInternal', 'val = %d', val), (log) => {
            if (log.isEnabled()) {
                log.log('value = %d', val);             // log with same level as in XLog constructor if enabled
                log.log('test-for-missing-args');
            }           

            this.throwException("exception tester");    // simulate exception
            return 2 * val;
        });
    }

    public doTest(name: string): number| undefined  {
        return using(new XLog(Tester.logger, levels.INFO, 'doTest', 'name = %s', name), (log) => {
            try {
                return this.doTestInternal(4711);
            } catch (exc) {
                log.error('Error: ', exc);
            }
        });
    }
}

class Tester2 {
    private static logger = getLogger('Tester2');

    constructor() {
        using(new XLog(Tester2.logger, levels.INFO, 'ctor'), (log) => {
            // ...
        });
    }
}

var tester = new Tester('Walter');
let val = tester.doTest('mein Test');

let tester2 = new Tester2();
