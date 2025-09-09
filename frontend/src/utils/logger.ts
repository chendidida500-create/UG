// 简单的日志工具，用于替代console语句
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

class Logger {
  private level: LogLevel;
  private prefix: string;

  constructor(prefix: string, level: LogLevel = LogLevel.INFO) {
    this.prefix = prefix;
    this.level = level;
  }

  private formatMessage(level: string, message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.prefix}] ${message}`;
  }

  debug(message: string, ...args: any[]) {
    if (this.level >= LogLevel.DEBUG) {
      // 在生产环境中不记录debug信息
      if (process.env.NODE_ENV !== 'production') {
        console.debug(this.formatMessage('DEBUG', message, ...args), ...args);
      }
    }
  }

  info(message: string, ...args: any[]) {
    if (this.level >= LogLevel.INFO) {
      console.info(this.formatMessage('INFO', message, ...args), ...args);
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.level >= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message, ...args), ...args);
    }
  }

  error(message: string, ...args: any[]) {
    if (this.level >= LogLevel.ERROR) {
      console.error(this.formatMessage('ERROR', message, ...args), ...args);
    }
  }
}

// 创建应用的默认logger实例
export const logger = new Logger('UG-FRONTEND');

// 工厂函数，用于创建特定模块的logger
export function createLogger(prefix: string, level?: LogLevel) {
  return new Logger(prefix, level);
}

export default Logger;