//import { createLogger, format, transports } from 'winston';
//
//const logger = createLogger({
//    transports: [
//        new transports.Console({
//            handleExceptions: true
//        })
//    ],
//    exitOnError: false
//});

class ConsoleLogger {
    constructor(options) {
        this.options = options;
    }

    log = (level, message, trace=false) => {
        const os = trace ? console.trace : console.log;
        os(`[${level}]: ${message}`);
    };
    info = message => this.log('info', message);
    warn = message => this.log('warn', message);
    error = message => this.log('error', message);
    assert = (condition, message=`ВНИМАНИЕ! Тест не пройден : ${JSON.stringify(condition)}`) => {
        if (!condition){
            if (this.options.debug){
                this.log('assert', message, true)
            }
            else {
                throw new Error(message);
            }
        }
    };
    debug = message => {
        this.options.debug ? this.log('debug', message) : null;
    };
}

export const consoleLogger = new ConsoleLogger({ debug: true });
