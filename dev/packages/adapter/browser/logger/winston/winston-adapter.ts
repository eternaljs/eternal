import winston, { Logger as WinstonLogger, format } from 'winston';
import { LoggerAdapter, LogLevel, LogEntry, LogFormatter, LoggerErrorHandler, Transport } from './logger-global';

const LOG_LEVEL_TO_WINSTON: Record<LogLevel, string> = {
  [LogLevel.Fatal]: 'error',
  [LogLevel.Error]: 'error',
  [LogLevel.Warn]: 'warn',
  [LogLevel.Info]: 'info',
  [LogLevel.Debug]: 'debug',
  [LogLevel.Trace]: 'silly'
};

const WINSTON_TO_LOG_LEVEL: Record<string, LogLevel> = {
  error: LogLevel.Error,
  warn: LogLevel.Warn,
  info: LogLevel.Info,
  debug: LogLevel.Debug,
  silly: LogLevel.Trace
};

/**
 * A Winston-backed logger adapter.
 */
export class WinstonLoggerAdapter implements LoggerAdapter {
  private winstonLogger: WinstonLogger;
  private currentLevel: LogLevel = LogLevel.Info;
  private transportsList: { original: Transport; winstonTransport: winston.Transport }[] = [];
  private formattersList: LogFormatter[] = [];
  private errorHandler?: LoggerErrorHandler;
  private prefix?: string;

  constructor(prefix?: string) {
    this.prefix = prefix;
    this.winstonLogger = this.createLogger();
  }

  private createLogger(): WinstonLogger {
    const allFormats = [
      // Prefix format if needed
      format((info) => {
        if (this.prefix) {
          info.message = `[${this.prefix}] ${info.message}`;
        }
        return info;
      })(),
      // Apply our formatters
      format((info) => {
        let entry: LogEntry = { level: this.mapWinstonToOurLevel(info.level), message: info.message };
        for (const f of this.formattersList) {
          entry = f.format(entry);
        }
        info.level = LOG_LEVEL_TO_WINSTON[entry.level];
        info.message = entry.message;
        return info;
      })(),
      format.json()
    ];

    const logger = winston.createLogger({
      level: LOG_LEVEL_TO_WINSTON[this.currentLevel],
      transports: this.transportsList.map(t => t.winstonTransport),
      format: format.combine(...allFormats)
    });

    // Attach error listeners to transports
    for (const { original, winstonTransport } of this.transportsList) {
      winstonTransport.on('error', (err: Error) => {
        if (this.errorHandler) {
          const entry: LogEntry = { level: LogLevel.Error, message: `Transport error: ${err.message}` };
          this.errorHandler(err, entry);
        }
      });
    }

    return logger;
  }

  private rebuildLogger(): void {
    this.winstonLogger = this.createLogger();
  }

  private mapWinstonToOurLevel(winstonLevel: string): LogLevel {
    return WINSTON_TO_LOG_LEVEL[winstonLevel] ?? LogLevel.Info; // Default to info if unknown
  }

  async log(level: LogLevel, message: string): Promise<void> {
    this.winstonLogger.log({ level: LOG_LEVEL_TO_WINSTON[level], message });
    return Promise.resolve();
  }

  fatal(message: string): Promise<void> {
    return this.log(LogLevel.Fatal, message);
  }

  error(message: string): Promise<void> {
    return this.log(LogLevel.Error, message);
  }

  warn(message: string): Promise<void> {
    return this.log(LogLevel.Warn, message);
  }

  info(message: string): Promise<void> {
    return this.log(LogLevel.Info, message);
  }

  debug(message: string): Promise<void> {
    return this.log(LogLevel.Debug, message);
  }

  trace(message: string): Promise<void> {
    return this.log(LogLevel.Trace, message);
  }

  isLevelEnabled(level: LogLevel): boolean {
    return this.winstonLogger.isLevelEnabled(LOG_LEVEL_TO_WINSTON[level]);
  }

  getLevel(): LogLevel {
    return this.currentLevel;
  }

  setLevel(level: LogLevel): void {
    this.currentLevel = level;
    this.winstonLogger.level = LOG_LEVEL_TO_WINSTON[level];
  }

  child(prefix: string): LoggerAdapter {
    const childLogger = new WinstonLoggerAdapter(prefix);
    childLogger.currentLevel = this.currentLevel;
    childLogger.transportsList = [...this.transportsList];
    childLogger.formattersList = [...this.formattersList];
    childLogger.errorHandler = this.errorHandler;
    childLogger.rebuildLogger();
    return childLogger;
  }

  addTransport(transport: Transport): void {
    const wTransport = this.createWinstonTransport(transport);
    this.transportsList.push({ original: transport, winstonTransport: wTransport });
    this.rebuildLogger();
  }

  removeTransport(transport: Transport): void {
    this.transportsList = this.transportsList.filter(t => t.original !== transport);
    this.rebuildLogger();
  }

  clearTransports(): void {
    this.transportsList = [];
    this.rebuildLogger();
  }

  addFormatter(formatter: LogFormatter): void {
    this.formattersList.push(formatter);
    this.rebuildLogger();
  }

  removeFormatter(formatter: LogFormatter): void {
    this.formattersList = this.formattersList.filter(f => f !== formatter);
    this.rebuildLogger();
  }

  clearFormatters(): void {
    this.formattersList = [];
    this.rebuildLogger();
  }

  onError(handler: LoggerErrorHandler): void {
    this.errorHandler = handler;
  }

  async flush(): Promise<void> {
    // Winston does not buffer by default.
    // If buffering is introduced, handle it here.
  }

  async close(): Promise<void> {
    // Close all transports that have a close method.
    await Promise.all(
      this.transportsList.map(t => t.winstonTransport.close?.())
        .filter((p): p is Promise<void> => p instanceof Promise)
    );
  }

  private createWinstonTransport(transport: Transport): winston.Transport {
    class CustomWinstonTransport extends winston.Transport {
      constructor(private customTransport: Transport) {
        super({ silent: false });
      }

      log(info: any, next: () => void): void {
        const { level, message } = info;
        const entry: LogEntry = {
          level: WINSTON_TO_LOG_LEVEL[level] ?? LogLevel.Info,
          message
        };
        this.customTransport.write(entry).finally(next);
      }

      async close(): Promise<void> {
        if (this.customTransport.close) {
          await this.customTransport.close();
        }
      }
    }

    return new CustomWinstonTransport(transport);
  }
}
