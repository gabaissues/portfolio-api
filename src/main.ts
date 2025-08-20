import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 10000;
  await app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

bootstrap();
