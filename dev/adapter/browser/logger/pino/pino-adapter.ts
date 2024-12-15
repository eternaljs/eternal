import pino, { Logger as PinoLogger } from 'pino';
import { LoggerAdapter, LogLevel, LogEntry, LogFormatter, LoggerErrorHandler, Transport } from './logger-global';

const LOG_LEVEL_TO_PINO: Record<LogLevel, string> = {
  [LogLevel.Fatal]: 'fatal',
  [LogLevel.Error]: 'error',
  [LogLevel.Warn]: 'warn',
  [LogLevel.Info]: 'info',
  [LogLevel.Debug]: 'debug',
  [LogLevel.Trace]: 'trace'
};

const PINO_TO_LOG_LEVEL: Record<string, LogLevel> = {
  fatal: LogLevel.Fatal,
  error: LogLevel.Error,
  warn:  LogLevel.Warn,
  info:  LogLevel.Info,
  debug: LogLevel.Debug,
  trace: LogLevel.Trace
};

/**
 * A Pino-based logger adapter that fulfills the LoggerAdapter interface.
 * We rely on Pino for level checks, child loggers, and level setting,
 * but we handle transports, formatting, and prefixing manually.
 */
export class PinoLoggerAdapter implements LoggerAdapter {
  private pinoLogger: PinoLogger;
  private currentLevel: LogLevel = LogLevel.Info;
  private prefix?: string;
  private transportsList: Transport[] = [];
  private formattersList: LogFormatter[] = [];
  private errorHandler?: LoggerErrorHandler;

  constructor(prefix?: string, baseLogger?: PinoLogger) {
    this.prefix = prefix;
    // Create a Pino logger that writes to a no-op stream.
    // Pino won't actually output logs anywhere. We just use it for logic.
    this.pinoLogger = baseLogger ?? pino({
      level: LOG_LEVEL_TO_PINO[this.currentLevel],
      // Pino expects a destination. We'll provide a no-op writable stream.
      transport: {
        target: 'pino-pretty', // or no transport, but pino-pretty with "destination: /dev/null" like approach
        options: { destination: '/dev/null' }
      },
      // Or use pino.destination({ write(){} }) to create a no-op stream:
      // transport: undefined,
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

    // Write to all transports
    // If a transport fails, we call onError if defined.
    await Promise.allSettled(
      this.transportsList.map(async (t) => {
        try {
          await t.write(entry);
        } catch (err: any) {
          if (this.errorHandler) {
            this.errorHandler(err instanceof Error ? err : new Error(String(err)), entry);
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
    // Pino uses numeric levels internally. Setting pinoLogger.level means 
    // pinoLogger.isLevelEnabled(level) is available.
    // Pino doesn't have isLevelEnabled by default before v8. If not available,
    // we can simulate:
    return this.pinoLogger.isLevelEnabled 
      ? this.pinoLogger.isLevelEnabled(LOG_LEVEL_TO_PINO[level])
      : this.simulateIsLevelEnabled(level);
  }

  private simulateIsLevelEnabled(level: LogLevel): boolean {
    // If isLevelEnabled is not available, we simulate it by comparing numeric values:
    const pinoNumeric = this.pinoLogger.levelVal; // Numeric level of current pino logger
    const desiredNumeric = pino.levels.values[LOG_LEVEL_TO_PINO[level]];
    return desiredNumeric >= pinoNumeric;
  }

  getLevel(): LogLevel {
    return this.currentLevel;
  }

  setLevel(level: LogLevel): void {
    this.currentLevel = level;
    this.pinoLogger.level = LOG_LEVEL_TO_PINO[level];
  }

  child(prefix: string): LoggerAdapter {
    // Create a new adapter with a child pino logger and the given prefix.
    // We'll just reuse the same pino instance by creating a child logger.
    const childLogger = this.pinoLogger.child({ prefix });
    const adapter = new PinoLoggerAdapter(prefix, childLogger);
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
    // Pino doesn't buffer by default and we are not buffering ourselves.
    // If buffering is introduced, implement it here.
  }

  async close(): Promise<void> {
    // Close any transports that have close methods.
    await Promise.all(
      this.transportsList.map(t => t.close?.()).filter((p): p is Promise<void> => p instanceof Promise)
    );
  }
}
