import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDataSources } from '../config';

@Module({
  providers: [
    {
      provide: 'DB_ALIANZA_DATASOURCE',
      useFactory: (configService: ConfigService) =>
        createDataSources(configService).dbAlianza.initialize(),
      inject: [ConfigService],
    },
    {
      provide: 'DB_FG_DATASOURCE',
      useFactory: (configService: ConfigService) =>
        createDataSources(configService).dbFG.initialize(),
      inject: [ConfigService],
    },
  ],
  exports: ['DB_ALIANZA_DATASOURCE', 'DB_FG_DATASOURCE'],
})
export class DatabaseModule {}
