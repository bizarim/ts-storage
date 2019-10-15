import * as IORedis from 'ioredis';

export enum eRedisDb {
    provider = 0,
    token = 1,
    scheduler = 2,
    address = 3,
}

export class RedisClients {
    protected clients: {
        [key: number]: IORedis.Redis;
    };
    // client: IORedis.Redis | undefined;
    constructor() {
        this.clients = {};
    }
    initialize(ip: string, port: number) {
        // todo 여러개 host를 사용 하려면 다른 방식으로
        // 현재 방식은 하나에 host에 복수개 db를 사용하는 구조
        const values = Object.values(eRedisDb).filter(x => typeof x === 'number');
        values.forEach(element => {
            const index = element as eRedisDb;
            this.clients[index] = new IORedis({ db: index, port: port, host: ip });
        });
    }

    get(db: eRedisDb): IORedis.Redis | undefined {
        return this.clients[db];
    }
}
