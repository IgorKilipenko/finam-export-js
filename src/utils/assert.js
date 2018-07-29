import {logger} from './logger';

const assert = (condition, message=`ВНИМАНИЕ! Тест не пройден : ${JSON.stringify(condition)}`, CustomError = Error) => {
    if (!condition){
        if (logger.options.level <= logger.levels.debug){
            logger.log('assert', message, true)
        }
        else {
            throw new CustomError(message);
        }
    }
};

export default assert;