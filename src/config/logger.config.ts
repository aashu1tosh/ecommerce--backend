import winston from 'winston';
const { timestamp, json } = winston.format;

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};

const transports = [
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/combined.log' }),
];
export const Logger = winston.createLogger({
    levels: levels,
    format: winston.format.combine(timestamp(), json()),
    transports,
});
