import { ConfigService } from '@nestjs/config';

export const CONFIG = 'CONFIG';

export interface AppConfig {
  database: {
    url: string;
    port: number;
    username: string;
    password: string;
    dbName: string;
  };
}

export const configProvider = {
  provide: CONFIG,
  useFactory: (cfg: ConfigService): AppConfig => ({
    database: {
      url: cfg.get<string>('DATABASE_URL')!,
      port: cfg.get<number>('DATABASE_PORT'),
      username: cfg.get<string>('DATABASE_USER'),
      password: cfg.get<string>('DATABASE_PASSWORD'),
      dbName: cfg.get<string>('DATABASE_NAME'),
    },
  }),
  inject: [ConfigService],
};
