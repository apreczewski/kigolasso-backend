import winston from 'winston';
import fs from 'fs';
import path from 'path';

const logLevel = process.env.LOG_LEVEL ?? 'info';
const isProduction = process.env.NODE_ENV === 'production';

// Create transports array
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
];

// In production, try to add file transport if logs directory is writable
if (isProduction) {
  const logsDir = path.resolve(process.cwd(), 'logs');

  try {
    // Check if logs directory exists and is writable
    if (fs.existsSync(logsDir)) {
      fs.accessSync(logsDir, fs.constants.W_OK);

      // Directory exists and is writable, add file transports
      transports.push(
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        })
      );

      transports.push(
        new winston.transports.File({
          filename: 'logs/combined.log',
        })
      );

      console.log('✅ File logging enabled in logs/');
    } else {
      console.warn('⚠️  logs/ directory not found, using console logging only');
    }
  } catch (error) {
    console.warn('⚠️  logs/ directory not writable, using console logging only');
  }
}

export const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level}]: ${stack ?? message}`;
    })
  ),
  transports,
});