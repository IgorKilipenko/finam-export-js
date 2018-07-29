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

const levels = { 
    error: 0, 
    warn: 1, 
    info: 2, 
    verbose: 3, 
    debug: 4, 
    silly: 5 
  }; 

class Logger {
    constructor(options = {level: levels.warn}) {
        this.options = options;
        this.levels = levels;
    }

    log = (level, message, trace=false) => {
        if (typeof this.levels[level] !== undefined && this.options.level >= this.levels[level]){
            const cout = trace ? console.trace : console.log;
            cout(`[${level}]: ${message}`);
        }
    };
    info = message => {
        if (this.options.level >= this.levels.warn){
            this.log('info', message);
        }
    };
    warn = message => {
        if (this.options.level >= this.levels.warn){
            this.log('warn', message)
        }
    };
    error = message => this.log('error', message);
    debug = message => {
        this.options.level >= this.levels.debug ? this.log('debug', message) : null;
    };
}

export const logger = new Logger({ level: levels.debug });
export {levels}