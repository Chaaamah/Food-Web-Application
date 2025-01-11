const winston = require("winston");
require('winston-daily-rotate-file');

// Configuration du format de log
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    const sanitizedMessage = message.toString().replace(/(password=|apiKey=|token=).*?($|\s)/g, '***');
    return `${timestamp} [${level.toUpperCase()}]: ${sanitizedMessage}`;
});

// Configuration du transport de journalisation
const transport = new winston.transports.DailyRotateFile({
    filename: 'log/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
});

// Configuration du logger
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json(),
        logFormat
    ),
    transports: [
        transport,
        new winston.transports.Console(),
    ],
});

module.exports = logger;
