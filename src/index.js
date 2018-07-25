//import {logger} from './util';
import * as finam from './finam/export';

//logger.log('info', 'start');

const logger = new class {
    log = (level, message) => console.log(message, { level });
    info = message => this.log('info', message);
    warn = message => this.log('warn', message);
    error = message => this.log('error', message);
}();

logger.log('info', 'strated');
