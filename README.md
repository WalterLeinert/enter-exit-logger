# enter-exit-logger
typescript/javascript method enter/exit logger based on log4js-node


enter-exit-logger helps to generate enter/exit traces for typescript methods using the disposable pattern. 
The trace logs are created with [log4js-node](https://github.com/nomiddlename/log4js-node).

## Installation

### Install module:

    `npm install enter-exit-logger --save`


## Quick Start

With enter-exit-logger method entry/exit logging can easily be added to typescript code.
See [log4js-node](https://github.com/nomiddlename/log4js-node) for further information concerning logging configuration.

```typescript
import { XLog, using,  Logger, getLogger, levels, configure } from 'enter-exit-logger';


export class Tester {
    // initialize a logger instance
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
            log.log('value = %d', val);                 // log with same level as in XLog constructor

            this.throwException("exception tester");    // simulate exception
            return 2 * val;
        });
    }

    public doTest(name: string): number {
        return using(new XLog(Tester.logger, levels.INFO, 'doTest', 'name = %s', name), (log) => {
            try {
                return this.doTestInternal(4711);
            } catch (exc) {
                log.error('Error: ', exc);
            }
        });
    }
}
```

What effectively is logged is controlled by the logging configuration.
(See also https://log4js-node.github.io/log4js-node/migration-guide.html).

Example (in config/log4js.json): 

```json
{
    "appenders": {
        "out": {
            "type": "console"
        },
        "task": {
            "type": "file",
            "filename": "log4js.log"
        }
    },
    "categories": {
        "default": {
            "appenders": [
                "out"
            ],
            "level": "info"
        },
        "Tester": {
            "appenders": [
                "task"
            ],
            "level": "debug"
        }
    }
}
```

The appenders are logging sinks which control where the logs are written.
The categories section controls which level applies to which logger. The category "default" means "all loggers" 
and defines the default level for all other loggers.

Samle output:

```
[2021-03-30T10:59:40.906] [INFO] Tester - >> ctor: name = Walter
[2021-03-30T10:59:40.912] [INFO] Tester - << ctor
[2021-03-30T10:59:40.913] [INFO] Tester - >> doTest: name = mein Test
[2021-03-30T10:59:40.913] [DEBUG] Tester -   >> doTestInternal: val = 4711
[2021-03-30T10:59:40.914] [DEBUG] Tester -   @  doTestInternal: value = 4711
[2021-03-30T10:59:40.914] [DEBUG] Tester -   @  doTestInternal: test-for-missing-args
[2021-03-30T10:59:40.914] [DEBUG] Tester -     >> throwException: message = exception tester
[2021-03-30T10:59:40.915] [DEBUG] Tester -     << throwException
[2021-03-30T10:59:40.915] [DEBUG] Tester -   << doTestInternal
[2021-03-30T10:59:40.915] [ERROR] Tester - @  doTest: Error:  Error: exception tester
    at disposable_1.using (/home/pi/test/typescript/enter-exit-logger/dist/test/xlog-test.js:40:19)
    at Object.using (/home/pi/test/typescript/enter-exit-logger/dist/lib/disposable.js:74:16)
    at Tester.throwException (/home/pi/test/typescript/enter-exit-logger/dist/test/xlog-test.js:39:22)
    at disposable_1.using (/home/pi/test/typescript/enter-exit-logger/dist/test/xlog-test.js:49:18)
    at Object.using (/home/pi/test/typescript/enter-exit-logger/dist/lib/disposable.js:74:16)
    at Tester.doTestInternal (/home/pi/test/typescript/enter-exit-logger/dist/test/xlog-test.js:44:29)
    at disposable_1.using (/home/pi/test/typescript/enter-exit-logger/dist/test/xlog-test.js:56:29)
    at Object.using (/home/pi/test/typescript/enter-exit-logger/dist/lib/disposable.js:74:16)
    at Tester.doTest (/home/pi/test/typescript/enter-exit-logger/dist/test/xlog-test.js:54:29)
    at Object.<anonymous> (/home/pi/test/typescript/enter-exit-logger/dist/test/xlog-test.js:75:18)
[2021-03-30T10:59:40.916] [INFO] Tester - << doTest
```
            