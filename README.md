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
import { XLog, using } from 'enter-exit-logger';
import { Logger, getLogger, levels, configure } from 'log4js'; 


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

Example (in config/log4js.json): 

```json
{
    "appenders": [
        {
            "type": "file",
            "filename": "log4js.log",
            "category": ["Tester", "console"],
            "levels": ["ERROR"],
            "layout": {
                "type": "pattern",
                "pattern": "%d{ISO8601} [%-5p] %-20c %m"
            }
        },
        {
            "type": "console",
            "layout": {
                "type": "pattern",
                "pattern": "%d{ISO8601} [%[%-5p%]] %[%-20c%] %m"
            }
        }
    ],
    "levels": {
        "[all]": "INFO",
        "Tester": "DEBUG"
    },
    "replaceConsole": true
}
```

The appenders are logging sinks which control where the logs are written.
The global levels section controls which level applies to which logger. The logger "[all]" means "all loggers" 
and defines the default level for all other loggers.
            