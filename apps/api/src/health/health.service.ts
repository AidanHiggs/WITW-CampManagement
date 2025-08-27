 
import mysql2 from 'mysql2/promise';
import redis, { Redis } from 'ioredis';
import {Injectable} from '@nestjs/common';

type status = 'up' | 'down'

@Injectable()
export class healthCheckService {

    async checkdb(): Promise<'up' | 'down'> {
        const url = process.env.DATABASE_URL!;
        let conn;
        try {
            conn = await mysql2.createConnection({           
                uri: url,
                connectTimeout: 1000,
            });
        const [rows] = await conn.query(
            'SELECT 1 AS aightdog'
        ) as [{aightdog: number}[]];

        return rows?.[0]?.aightdog ? 'up' : 'down';
        } catch (error) {
            return 'down';
        } finally {
            if (conn) {
                await conn.end();
            }
        }
    }
    async checkredis(): Promise<'up' | 'down'> {
        
        const url = process.env.REDIS_URL!;
        const redis = new Redis({
            host: url,
            connectTimeout: 1000,
            lazyConnect: true,
            maxRetriesPerRequest: 0,
        });
        try{
            const pong = await redis.ping();
            return pong === 'PONG' ? 'up' : 'down';
        } catch (error){
            return 'down';
        } finally {
            if (redis) {
                redis.disconnect();
            }
        }
    }


}