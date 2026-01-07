import { ConfigService } from '@nestjs/config';

export const CONFIG = 'CONFIG';

export interface AppConfig {
  database: { driver: string; url: string };
}

export const configProvider = {
  provide: CONFIG,
  useFactory: (cfg: ConfigService): AppConfig => ({
    database: {
      driver: cfg.get<string>('DATABASE_DRIVER', 'mongodb'),
      url: cfg.get<string>('DATABASE_URL')!,
    },
  }),
  inject: [ConfigService],
};
