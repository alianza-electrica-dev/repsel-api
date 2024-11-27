import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const createDataSources = (configService: ConfigService) => ({
  dbAlianza: new DataSource({
    type: 'mssql',
    host: configService.get<string>('DB_ALIANZA_HOST'),
    port: +configService.get<number>('DB_ALIANZA_PORT'),
    database: configService.get<string>('DB_ALIANZA_NAME'),
    username: configService.get<string>('DB_ALIANZA_USERNAME'),
    password: configService.get<string>('DB_ALIANZA_PASSWORD'),
    synchronize: true,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
    requestTimeout: 3000,
  }),

  dbFG: new DataSource({
    type: 'mssql',
    host: configService.get<string>('DB_FG_HOST'),
    port: +configService.get<number>('DB_FG_PORT'),
    database: configService.get<string>('DB_FG_NAME'),
    username: configService.get<string>('DB_FG_USERNAME'),
    password: configService.get<string>('DB_FG_PASSWORD'),
    synchronize: true,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
    requestTimeout: 3000,
  }),
});
