import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const port = +process.env.APP_PORT;

async function main() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  await app.listen(port);
  Logger.log(`Repsel API running on port ${port}`);
}
main();
