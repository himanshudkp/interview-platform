import http from 'http';
import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.WEBSOCKET_PORT || 1234;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({ filename: 'logs/websocket-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/websocket-combined.log' }),
  ],
});

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Y-WebSocket Server Running');
});

server.listen(PORT, () => {
  logger.info(`Y-WebSocket server running on port ${PORT}`);
  logger.info(`WebSocket endpoint: ws://localhost:${PORT}`);
});
