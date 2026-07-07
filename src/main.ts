import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//=====================================================

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //=ValidationPipe===========================
  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );

  //=Swagger===========================
  const config = new DocumentBuilder()
    .setTitle('Office Automation API')
    .setDescription('REST API for office automation system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  //=Run===========================
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
