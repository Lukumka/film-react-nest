import { LoggerService, Injectable } from '@nestjs/common';
import * as console from 'node:console';

@Injectable()
export class JsonLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return JSON.stringify({ level, message, optionalParams });
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]): any {}

  warn(message: any, ...optionalParams: any[]): any {}
}
