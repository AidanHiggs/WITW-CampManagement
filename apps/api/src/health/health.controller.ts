import { Controller, Get, Version } from '@nestjs/common';
import { healthCheckService } from './health.service';

@Controller('health')
export class healthController { //controller for the health route
    constructor(private readonly health: healthCheckService) {} //injects my healthcheckservice into the controller 

    @Get('basic')
    @Version('1')
    basic(){
        return { ok: true, service: 'api', version: '0.0.1'};
            
            }
        
    @Get('deps')
    @Version('1')
    async deps(){
        const [db, redis] = await Promise.all([
            this.health.checkdb(),
            this.health.checkredis(),
        ]);

        return {
            db: db,
            redis: redis,
            ses: 'unknown',
            stripe: 'unknown',

        };
    }
}
    




