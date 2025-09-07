import { Module } from '@nestjs/common';                     // Nest module decorator
import { ConfigModule } from '@nestjs/config';               // <-- loads .env into process.env
import { healthController } from './health/health.controller';
import { healthCheckService } from './health/health.service';

@Module({
  imports: [
    // Load .env at startup; isGlobal:true makes env available everywhere without re-importing.
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env',
    }),                //this is what actually reads apps/api/.env
  ],
  controllers: [healthController],                           // HTTP endpoints
  providers:   [healthCheckService],                              // injectable services (DB/Redis checks)
})
export class AppModule {}
