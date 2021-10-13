class Logger {
  logger: Console;

  constructor() {
    this.logger = console;
  }

  logInfo(message: string, payload: object = {}) {
    this.logger.log({ level: 'INFO', message, ...payload });
  }

  logError(message: string, payload: object = {}) {
    this.logger.log({ level: 'ERROR', message, ...payload });
  }

  logDebug(message: string, payload: object = {}) {
    this.logger.log({ level: 'DEBUG', message, ...payload });
  }
}

const logger = new Logger();

export default logger;
