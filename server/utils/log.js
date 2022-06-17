import winston, { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { prettyPrint, simple, combine, timestamp, colorize } = format;

const dailyRotateFile = new winston.transports.DailyRotateFile({
    filename: '%DATE%.log',
    dirname: 'logs',
    datePattern: 'DD-MM-YYYY',
    maxSize: '1m',
    maxFiles: 1,
    level: 'warn',
    format: combine(timestamp({format: 'DD-MM-YYYY HH:mm:ss'}), prettyPrint())
});

const log = createLogger({
    transports: [
        new transports.Console({format: combine(colorize(), simple())}),
        dailyRotateFile
    ]
});

export default log;