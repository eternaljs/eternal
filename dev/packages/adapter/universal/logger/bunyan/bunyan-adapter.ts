import bunyan, { Logger as BunyanLogger, LogLevel as BunyanLogLevel } from 'bunyan';
import { LoggerAdapter, LogLevel, LogEntry, LogFormatter, LoggerErrorHandler, Transport } from './logger-global';

const LOG_LEVEL_TO_BUNYAN: Record<LogLevel, BunyanLogLevel> = {
  [LogLevel.Fatal]: bunyan.FATAL, // 60
  [LogLevel.Error]: bunyan.ERROR, // 50
  [LogLevel.Warn]:  bunyan.WARN,  // 40
  [LogLevel.Info]:  bunyan.INFO,  // 30
  [LogLevel.Debug]: bunyan.DEBUG, // 20
  [LogLevel.Trace]: bunyan.TRACE  // 10
};

const BUNYAN_TO_LOG_LEVEL: Record<number, LogLevel> = {
  [bunyan.FATAL]: LogLevel.Fatal,
  [bunyan.ERROR]: LogLevel.Error,
  [bunyan.WARN]:  LogLevel.Warn,
  [bunyan.INFO]:  LogLevel.Info,
  [bunyan.DEBUG]: LogLevel.Debug,
  [bunyan.TRACE]: LogLevel.Trace
};

/**
 * A Bunyan-based logger adapter that meets the LoggerAdapter interface requirements.
 * We rely on Bunyan for:
 * - Level handling (setting, getting, checking)
 * - Child loggers for prefixing context
 *
 * We handle transports, formatters, prefixes, and error handling outside of Bunyan.
 */
export class BunyanLoggerAdapter implements LoggerAdapter {
  private bunyanLogger: BunyanLogger;
  private currentLevel: LogLevel = LogLevel.Info;
  private prefix?: string;
  private transportsList: Transport[] = [];
  private formattersList: LogFormatter[] = [];
  private errorHandler?: LoggerErrorHandler;

  constructor(prefix?: string, baseLogger?: BunyanLogger) {
    this.prefix = prefix;
    this.bunyanLogger = baseLogger ?? bunyan.createLogger({
      name: 'bunyan-adapter',
      level: LOG_LEVEL_TO_BUNYAN[this.currentLevel],
      // No-op stream: This ensures Bunyan doesn't write anything by itself.
      streams: [{
        type: 'raw',
        stream: {
          write: () => { /* no-op */ }
        }
      }]
    });
  }

  async log(level: LogLevel, message: string): Promise<void> {
    if (!this.isLevelEnabled(level)) {
      return;
    }

    let entry: LogEntry = {
      level,
      message: this.prefix ? `[${this.prefix}] ${message}` : message
    };

    // Apply formatters
    for (const f of this.formattersList) {
      entry = f.format(entry);
    }

    // Write to transports, handle errors
    await Promise.allSettled(
      this.transportsList.map(async (t) => {
        try {
          await t.write(entry);
        } catch (err: any) {
          if (this.errorHandler) {
            const error = err instanceof Error ? err : new Error(String(err));
            this.errorHandler(error, entry);
          }
        }
      })
    );
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
    // Bunyan's current level as a number:
    const currentLevelValue = this.bunyanLogger.level();
    const desiredLevelValue = LOG_LEVEL_TO_BUNYAN[level];
    // If desiredLevelValue >= currentLevelValue, it means logging is enabled.
    return desiredLevelValue >= currentLevelValue;
  }

  getLevel(): LogLevel {
    return this.currentLevel;
  }

  setLevel(level: LogLevel): void {
    this.currentLevel = level;
    this.bunyanLogger.level(LOG_LEVEL_TO_BUNYAN[level]);
  }

  child(prefix: string): LoggerAdapter {
    const childBunyanLogger = this.bunyanLogger.child({ prefix });
    const adapter = new BunyanLoggerAdapter(prefix, childBunyanLogger);
    adapter.currentLevel = this.currentLevel;
    adapter.transportsList = [...this.transportsList];
    adapter.formattersList = [...this.formattersList];
    adapter.errorHandler = this.errorHandler;
    adapter.setLevel(this.currentLevel);
    return adapter;
  }

  addTransport(transport: Transport): void {
    this.transportsList.push(transport);
  }

  removeTransport(transport: Transport): void {
    this.transportsList = this.transportsList.filter(t => t !== transport);
  }

  clearTransports(): void {
    this.transportsList = [];
  }

  addFormatter(formatter: LogFormatter): void {
    this.formattersList.push(formatter);
  }

  removeFormatter(formatter: LogFormatter): void {
    this.formattersList = this.formattersList.filter(f => f !== formatter);
  }

  clearFormatters(): void {
    this.formattersList = [];
  }

  onError(handler: LoggerErrorHandler): void {
    this.errorHandler = handler;
  }

  async flush(): Promise<void> {
    // Bunyan does not buffer by default and we are not buffering.
    // If buffering is introduced, handle flushing here.
  }

  async close(): Promise<void> {
    // Close any transports that have close methods.
    await Promise.all(
      this.transportsList
        .map(t => t.close?.())
        .filter((p): p is Promise<void> => p instanceof Promise)
    );
  }
}
