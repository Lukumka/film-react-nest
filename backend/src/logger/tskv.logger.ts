import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private escape(value: any): string {
    return String(value)
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');
  }

  private formatMessage(level: string, message: any, optionalParams: any[]) {
    const fields = {
      level,
      message:
        typeof message === 'object' ? JSON.stringify(message) : String(message),
      optionalParams: JSON.stringify(optionalParams),
      timestamp: new Date().toISOString(),
    };

    return Object.entries(fields)
      .map(([key, value]) => `${key}=${this.escape(value)}`)
      .join('\t');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }
}
