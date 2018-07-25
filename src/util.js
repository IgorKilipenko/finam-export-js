import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    transports: [
        new transports.Console({
            handleExceptions: true
        })
    ],
    exitOnError: false
});

export { logger };
