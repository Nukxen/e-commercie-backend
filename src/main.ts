import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { validateOrReject } from 'class-validator';
import { AppModule, ObserveInstrument } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  //Faz todas as rotas tem o prefixo api/v1, exemplo: api/v1/users
  app.setGlobalPrefix('/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('API for managing e-commerce operations')
    .setVersion('1.0')
    .build();

  const swaggerDocument = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
  console.clear();
  console.log(
    `🚀 Server is running on: http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
void bootstrap();
