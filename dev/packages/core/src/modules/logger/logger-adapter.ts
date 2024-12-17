import { Logger } from "vite";
import { LogFormatter, LoggerErrorHandler, LogLevel, Transport } from "./logger-global";

/**
 * A unified, logger interface.
 */
export interface LoggerAdapter {
  /**
   * Logs a message at the specified level.
   * @param level The severity level for this log entry.
   * @param message The message to log.
   * @returns A promise that resolves when the log entry has been processed by all transports.
   */
  log(level: LogLevel, message: string, metadata?: Record<string, unknown>,): Promise<void>;

  /**
   * Logs a fatal message.
   * @param message The message to log.
   */
  fatal(message: string): Promise<void>;

  /**
   * Logs an error message.
   * @param message The message to log.
   */
  error(message: string): Promise<void>;

  /**
   * Logs a warning message.
   * @param message The message to log.
   */
  warn(message: string): Promise<void>;

  /**
   * Logs an informational message.
   * @param message The message to log.
   */
  info(message: string): Promise<void>;

  /**
   * Logs a debug message.
   * @param message The message to log.
   */
  debug(message: string): Promise<void>;

  /**
   * Logs a trace message.
   * @param message The message to log.
   */
  trace(message: string): Promise<void>;

  /**
   * Checks if a given level is currently enabled.
   * @param level The level to check.
   * @returns True if the level is enabled, false otherwise.
   */
  isLevelEnabled(level: LogLevel): boolean;

  /**
   * Gets the current log level.
   * @returns The currently set log level.
   */
  getLevel(): LogLevel;

  /**
   * Sets the current log level. Logs below this level will be ignored.
   * @param level The new log level.
   */
  setLevel(level: LogLevel): void;

  /**
   * Creates a new logger instance that automatically prefixes all messages
   * with the given string. This can be used to establish context (e.g., a request ID).
   * @param prefix A string to prepend to all messages logged by the child.
   * @returns A new logger instance with prefixed messages.
   */
  child(prefix: string): Logger;

  /**
   * Adds a transport for writing log entries.
   * @param transport The transport to add.
   */
  addTransport(transport: Transport): void;

  /**
   * Removes a previously added transport.
   * @param transport The transport to remove.
   */
  removeTransport(transport: Transport): void;

  /**
   * Removes all transports.
   */
  clearTransports(): void;

  /**
   * Adds a formatter to transform log entries before they're sent to transports.
   * Multiple formatters will be applied in the order they were added.
   * @param formatter The formatter to add.
   */
  addFormatter(formatter: LogFormatter): void;

  /**
   * Removes a previously added formatter.
   * @param formatter The formatter to remove.
   */
  removeFormatter(formatter: LogFormatter): void;

  /**
   * Removes all formatters.
   */
  clearFormatters(): void;

  /**
   * Sets a callback that will be invoked if an error occurs during logging
   * (e.g., if a transport fails). If not set, errors may be silently ignored.
   * @param handler The error handler callback.
   */
  onError(handler: LoggerErrorHandler): void;

  /**
   * Flushes all buffered logs from transports. Ensures that all pending logs
   * have been written before resolving.
   * @returns A promise that resolves once all buffered logs have been written.
   */
  flush(): Promise<void>;

  /**
   * Closes the logger, shutting down all transports and releasing resources.
   * This ensures all logs are flushed before resolving.
   * @returns A promise that resolves when the logger is fully closed.
   */
  close(): Promise<void>;
}
