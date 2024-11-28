import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { AppModule } from './app.module';

async function main() {
  exec('curl ifconfig.me', (error, stdout, stderr) => {
    if (error) {
      Logger.error(`Error al obtener la IP: ${stderr}`);
    } else {
      Logger.log(`IP pública del servidor: ${stdout.trim()}`);
    }
  });

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  const port = +process.env.APP_PORT || 3000;
  await app.listen(port);

  Logger.log(`Repsel API running on port ${port}`);
}
main();
