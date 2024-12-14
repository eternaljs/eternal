import { LogLevel } from "./log-global";

export interface LogAdapter {
  /**
   * Logs a message at the specified level.
   * @param level - The log level (info, warn, error, debug).
   * @param message - The message to log.
   * @param metadata - Additional metadata for the log entry.
   */
  log(
    level: LogLevel,
    message: string,
    metadata?: Record<string, unknown>,
  ): void;

  flush(): Promise<void>;
}
