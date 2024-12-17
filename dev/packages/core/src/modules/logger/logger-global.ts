/**
 * Severity levels for logging, using an enum to ensure consistency and prevent typos.
 */
export enum LogLevel {
    Fatal = 'fatal',
    Error = 'error',
    Warn = 'warn',
    Info = 'info',
    Debug = 'debug',
    Trace = 'trace'
}

/**
 * A basic log entry consists of a level and a message.
 * Additional context can be provided indirectly (e.g., by child loggers or prefixing).
 */
export interface LogEntry {
    level: LogLevel;
    message: string;
}

/**
 * A formatter transforms a log entry before it is passed to transports.
 */
export interface LogFormatter {
    /**
     * Transforms the given log entry.
     * @param entry The original log entry.
     * @returns The transformed log entry.
     */
    format(entry: LogEntry): LogEntry;
}

/**
 * A transport defines where logs are written (e.g., console, file, remote service).
 */
export interface Transport {
    /**
     * A string identifying this transport type (e.g. "console", "file", "remote").
     */
    type: string;

    /**
     * Writes a log entry to the destination defined by the transport.
     * @param entry The log entry to write.
     * @returns A promise that resolves when the write completes.
     */
    write(entry: LogEntry): Promise<void>;

    /**
     * Closes the transport, releasing any resources (if applicable).
     * @returns A promise that resolves when the transport has closed.
     */
    close?(): Promise<void>;
}

/**
 * A callback function type for handling logging errors.
 * If a transport fails, this callback can be invoked with details.
 */
export type LoggerErrorHandler = (error: Error, entry: LogEntry) => void;
