import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

export const app = express();

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));

  nestApp.enableCors({
    origin: '*',
  });
  nestApp.useGlobalPipes(new ValidationPipe());

  await nestApp.init();
}

bootstrap();

export default app;
