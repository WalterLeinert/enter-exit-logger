# MLogger
typescript/javascript method enter/exit logger based on log4js-node


mlogger helps to generate enter/exit traces for typescript methods using the disposable pattern. 
The trace logs are created with [log4js-node](https://github.com/nomiddlename/log4js-node).

## Installation

1. Install module:

    `npm install mlogger --save`


## Quick Start

With MLogger method entry/exit logging can easily be added to typescript code.  

```typescript
import { MLogger, using } from 'mlogger';
import { Logger, getLogger, levels, configure } from 'log4js'; 


export class Tester {
    // initialize a 
    private static logger = getLogger('Tester');

    constructor(name: string) {
        using(new MLogger(Tester.logger, levels.INFO, 'ctor', 'name = %s', name), (log) => {
            // ...
        });
    }

    private throwException(message: string) {
        using(new MLogger(Tester.logger, levels.DEBUG, 'throwException', 'message = %s', message), (log) => {
            throw new Error(message);
        });
    }

    private doTestInternal(val: number): number {
        return using(new MLogger(Tester.logger, levels.DEBUG, 'doTestInternal', 'val = %d', val), (log) => {
            log.log('value = %d', val);

            this.throwException("exception tester");    // simulate exception
            return 2 * val;
        });
    }

    public doTest(name: string): number {
        return using(new MLogger(Tester.logger, levels.INFO, 'doTest', 'name = %s', name), (log) => {
            try {
                return this.doTestInternal(4711);
            } catch (exc) {
                log.error('Error: ', exc);
            }
        });
    }
}

````
            