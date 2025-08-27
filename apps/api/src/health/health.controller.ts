import { Controller, Get, Version } from '@nestjs/common';
import { healthCheckService } from './health.service';

@Controller('health')
export class healthController {
    constructor(private readonly health: healthCheckService) {}

    @Get('basic')
    @Version('1')
    basic(){
        return { ok: true, service: 'api', version: '0.0.1'};
            
            }
        
    @Get('deps')
    @Version('1')
    async deps(){
        const [db, redis] = await Promise.all([
            this.healthCheckService?.checkDb(),
            this.healthCheckService?.checkRedis(),
        ]);

        return {
            db: db.ok,
            redis: redis.ok,
            ses: 'unknown',
            stripe: 'unknown',

        };
    }
}
    




