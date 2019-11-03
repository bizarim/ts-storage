"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IORedis = require("ioredis");
var eRedisDb;
(function (eRedisDb) {
    eRedisDb[eRedisDb["provider"] = 0] = "provider";
    eRedisDb[eRedisDb["token"] = 1] = "token";
    eRedisDb[eRedisDb["scheduler"] = 2] = "scheduler";
    eRedisDb[eRedisDb["address"] = 3] = "address";
})(eRedisDb = exports.eRedisDb || (exports.eRedisDb = {}));
class RedisClients {
    // client: IORedis.Redis | undefined;
    constructor() {
        this.clients = {};
    }
    initialize(ip, port) {
        // todo 여러개 host를 사용 하려면 다른 방식으로
        // 현재 방식은 하나에 host에 복수개 db를 사용하는 구조
        const values = Object.values(eRedisDb).filter(x => typeof x === 'number');
        values.forEach(element => {
            const index = element;
            this.clients[index] = new IORedis({ db: index, port: port, host: ip });
        });
    }
    get(db) {
        return this.clients[db];
    }
}
exports.RedisClients = RedisClients;
//# sourceMappingURL=RedisClients.js.map