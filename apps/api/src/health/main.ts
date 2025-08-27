import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { HealthModule } from './health.module';
async function bootstrap() { 
  const app = await NestFactory.create(HealthModule, { //creates a new app instance
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], //sets the logger for the app
    });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1', prefix: 'api' }); //enables app versioning for the api
  await app.listen(process.env.PORT || 3000);
}

bootstrap(); //bootstraps the app and starts server 