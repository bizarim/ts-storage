import * as IORedis from 'ioredis';
export declare enum eRedisDb {
    provider = 0,
    token = 1,
    scheduler = 2,
    address = 3
}
export declare class RedisClients {
    protected clients: {
        [key: number]: IORedis.Redis;
    };
    constructor();
    initialize(ip: string, port: number): void;
    get(db: eRedisDb): IORedis.Redis | undefined;
}
