import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { exec } from 'child_process';

async function main() {
  exec('curl ifconfig.me', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al obtener la IP: ${stderr}`);
    } else {
      console.log(`IP pública del servidor: ${stdout.trim()}`);
    }
  });

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  const port = +process.env.APP_PORT || 3000;
  await app.listen(port);

  Logger.log(`Repsel API running on port ${port}`);
}
main();
