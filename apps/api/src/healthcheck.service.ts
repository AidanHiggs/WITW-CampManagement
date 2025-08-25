 
import mysql2 from 'mysql2/promise';
import redis from 'ioredis';
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
    checkredis(): Promise<'up' | 'down'> {
        const url = process.env.REDIS_URL!;
        let conn;
        try{
            conn = new redis({
                host: url
            });
             conn.connect();
            return Promise.resolve('up');
        } catch (error){
            return Promise.resolve('down');
        } finally {
            if (conn) {
                conn.quit();
            }
        }
        
    }


}