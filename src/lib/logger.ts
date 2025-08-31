type LogLevel = 'error' | 'warn' | 'info' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  error?: Error;
  metadata?: Record<string, unknown>;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatLogEntry(entry: LogEntry): string {
    const { level, message, timestamp, context, error, metadata } = entry;
    let logString = `[${timestamp}] ${level.toUpperCase()}`;
    
    if (context) {
      logString += ` [${context}]`;
    }
    
    logString += `: ${message}`;
    
    if (error) {
      logString += `\nError: ${error.message}\nStack: ${error.stack}`;
    }
    
    if (metadata && Object.keys(metadata).length > 0) {
      logString += `\nMetadata: ${JSON.stringify(metadata, null, 2)}`;
    }
    
    return logString;
  }

  private log(level: LogLevel, message: string, context?: string, error?: Error, metadata?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
      metadata,
    };

    const formattedLog = this.formatLogEntry(entry);

    if (this.isDevelopment) {
      switch (level) {
        case 'error':
          console.error(formattedLog);
          break;
        case 'warn':
          console.warn(formattedLog);
          break;
        case 'info':
          console.info(formattedLog);
          break;
        case 'debug':
          console.debug(formattedLog);
          break;
      }
    } else {
      // In production, you might want to send logs to an external service
      // For now, we'll still use console but could be replaced with proper logging service
      switch (level) {
        case 'error':
        case 'warn':
          console.error(formattedLog);
          break;
        default:
          // Skip info and debug logs in production
          break;
      }
    }
  }

  error(message: string, error?: Error, context?: string, metadata?: Record<string, unknown>) {
    this.log('error', message, context, error, metadata);
  }

  warn(message: string, context?: string, metadata?: Record<string, unknown>) {
    this.log('warn', message, context, undefined, metadata);
  }

  info(message: string, context?: string, metadata?: Record<string, unknown>) {
    this.log('info', message, context, undefined, metadata);
  }

  debug(message: string, context?: string, metadata?: Record<string, unknown>) {
    this.log('debug', message, context, undefined, metadata);
  }
}

export const logger = new Logger();