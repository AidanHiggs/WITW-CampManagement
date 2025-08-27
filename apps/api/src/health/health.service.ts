 
import mysql2 from 'mysql2/promise';
import redis, { Redis } from 'ioredis';
import {Injectable} from '@nestjs/common';

type status = 'up' | 'down'

@Injectable()
export class healthCheckService {

    async checkdb(): Promise<'up' | 'down'> { //checks if db is up, if not return down
        const url = process.env.DATABASE_URL!;
        let conn;
        try {
            conn = await mysql2.createConnection({        //creates connection to db    
                uri: url,
                connectTimeout: 1000,
            });
        const [rows] = await conn.query( //creates a query to send to the db over conn connection
            'SELECT 1 AS aightdog'
        ) as [{aightdog: number}[]]; //creates a type for the query

        return rows?.[0]?.aightdog ? 'up' : 'down'; //returns up if db is up, down if not
        } catch (error) {
            return 'down';
        } finally {
            if (conn) {
                await conn.end(); //closes connection to db
            }
        }
    }
    async checkredis(): Promise<'up' | 'down'> { //checks if redis is up, if not return down
        
        const url = process.env.REDIS_URL!;
        const redis = new Redis({ //creates a new redis client
            host: url,
            connectTimeout: 1000,
            lazyConnect: true, 
            maxRetriesPerRequest: 0,
        });
        try{
            const pong = await redis.ping(); //pings redis 
            return pong === 'PONG' ? 'up' : 'down'; //if pong is returned from redis, return up, if not return down 
        } catch (error){
            return 'down';
        } finally {
            if (redis) {
                redis.disconnect();
            }
        }
    }


}