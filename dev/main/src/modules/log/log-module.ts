import { LogAdapter } from "./log-adapter";
import { LogLevel } from "./log-global";

export class LogModule {
  private adapter: LogAdapter;

  constructor(config: { adapter: LogAdapter }) {
    this.adapter = config.adapter;
  }

  /**
   * Logs a message at the specified level.
   * @param level - The log level (e.g., info, warn, error, debug, trace, fatal).
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  log(
    level: LogLevel,
    message: string,
    metadata?: Record<string, unknown>,
  ): void {
    this.adapter.log(level, message, metadata);
  }

  /**
   * Logs an informational message.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  info(message: string, metadata?: Record<string, unknown>): void {
    this.log("info", message, metadata);
  }

  /**
   * Logs a warning message.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  warn(message: string, metadata?: Record<string, unknown>): void {
    this.log("warn", message, metadata);
  }

  /**
   * Logs an error message.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  error(message: string, metadata?: Record<string, unknown>): void {
    this.log("error", message, metadata);
  }

  /**
   * Logs a debug message.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  debug(message: string, metadata?: Record<string, unknown>): void {
    this.log("debug", message, metadata);
  }

  /**
   * Logs a trace message.
   * Useful for detailed, step-by-step application tracing.
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  trace(message: string, metadata?: Record<string, unknown>): void {
    this.log("trace", message, metadata);
  }
  
  /**
   * Flushes any buffered log entries.
   * Ensures that all pending logs are sent to the logging destination.
   */
  async flush(): Promise<void> {
    await this.adapter.flush();
  }
}
