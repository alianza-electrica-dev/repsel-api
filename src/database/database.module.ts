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
    {
      provide: 'DB_FGM_DATASOURCE',
      useFactory: (configService: ConfigService) =>
        createDataSources(configService).dbFGM.initialize(),
      inject: [ConfigService],
    },
    {
      provide: 'DB_PACIFICO_DATASOURCE',
      useFactory: (configService: ConfigService) =>
        createDataSources(configService).dbPacifico.initialize(),
      inject: [ConfigService],
    },
  ],
  exports: [
    'DB_ALIANZA_DATASOURCE',
    'DB_FG_DATASOURCE',
    'DB_FGM_DATASOURCE',
    'DB_PACIFICO_DATASOURCE',
  ],
})
export class DatabaseModule {}
