import { LoggerAdapter } from "./logger-adapter";
import { LogLevel } from "./logger-global";

export class LoggerModule {
  private adapter: LoggerAdapter;

  constructor(config: { adapter: LoggerAdapter }) {
    this.adapter = config.adapter;
  }

  /**
   * Logs a message at the specified level.
   * @param level - The log level (e.g., LogLevel.info, LogLevel.warn, etc.).
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   * @returns A promise that resolves when the log entry is processed.
   */
  async log(
    level: LogLevel,
    message: string,
    metadata?: Record<string, unknown>,
  ): Promise<void> {
    if (this.isLevelEnabled(level)) {
      await this.adapter.log(level, message, metadata);
    }
  }

  /**
   * Logs an informational message.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  async info(message: string, metadata?: Record<string, unknown>): Promise<void> {
    await this.log(LogLevel.Info, message, metadata);
  }

  /**
   * Logs a warning message.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  async warn(message: string, metadata?: Record<string, unknown>): Promise<void> {
    await this.log(LogLevel.Warn, message, metadata);
  }

  /**
   * Logs an error message.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  async error(message: string, metadata?: Record<string, unknown>): Promise<void> {
    await this.log(LogLevel.Error, message, metadata);
  }

  /**
   * Logs a debug message.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  async debug(message: string, metadata?: Record<string, unknown>): Promise<void> {
    await this.log(LogLevel.Debug, message, metadata);
  }

  /**
   * Logs a trace message.
   * Useful for detailed, step-by-step application tracing.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  async trace(message: string, metadata?: Record<string, unknown>): Promise<void> {
    await this.log(LogLevel.Trace, message, metadata);
  }

  /**
   * Logs a fatal error message.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  async fatal(message: string, metadata?: Record<string, unknown>): Promise<void> {
    await this.log(LogLevel.Fatal, message, metadata);
  }

  /**
   * Flushes any buffered log entries.
   * Ensures that all pending logs are sent to the logging destination.
   */
  async flush(): Promise<void> {
    await this.adapter.flush();
  }

  /**
   * Checks if a given log level is enabled.
   * @param level - The log level to check.
   * @returns True if the level is enabled, false otherwise.
   */
  isLevelEnabled(level: LogLevel): boolean {
    return this.adapter.isLevelEnabled(level);
  }
}
