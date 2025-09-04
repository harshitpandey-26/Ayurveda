import winston, { transports } from 'winston';

const { combine, timestamp, printf } = winston.format;

const customFormat = printf(({level,message,timestamp})=>{
    return `${timestamp} ${level}: ${message}`;
})

export const logger = winston.createLogger({
    format: combine(timestamp({format:"YYYY-MM-DD HH:mm:ss"}),customFormat),
    transports:[
        new transports.Console(),
        new transports.File({filename:"combined.logs"})
    ]
});

