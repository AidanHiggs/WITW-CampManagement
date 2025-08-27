import { Module } from '@nestjs/common';
import { healthController } from './health.controller';
import { healthCheckService } from './health.service';

@Module({
  controllers: [healthController],
  providers: [healthCheckService],
})
export class HealthModule {}
