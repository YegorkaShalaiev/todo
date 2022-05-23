import winston, { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { prettyPrint, simple } = format;

const dailyRotateFile = new winston.transports.DailyRotateFile({
    filename: '%DATE%.log',
    dirname: 'logs',
    datePattern: 'DD-MM-YYYY',
    maxSize: '1m',
    maxFiles: 1,
    level: 'warn'
});

const log = createLogger({
    format: prettyPrint(),
    transports: [
        new transports.Console({format: simple()}),
        dailyRotateFile
    ]
});

export default log;