import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { HealthModule } from './health.module';
async function bootstrap() {
  const app = await NestFactory.create(HealthModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1', prefix: 'api' });
  await app.listen(process.env.PORT || 3000);
}

bootstrap();