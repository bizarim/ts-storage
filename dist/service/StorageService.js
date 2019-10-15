"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_common_1 = require("ts-common");
const __1 = require("..");
class StorageService {
    constructor() {
        this.bInit = false;
    }
    initialize(path, logger) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger = logger;
            this.loader = new ts_common_1.ConfigLoader();
            this.config = this.loader.toJson(path);
            this.pool = new __1.DbPools();
            this.redis = new __1.RedisClients();
            yield this.pool.initialize(this.config);
            this.redis.initialize(this.config.redis.ip, this.config.redis.port);
            this.bInit = true;
        });
    }
    /** Repository connection pool 얻기 */
    getPool(db) {
        if (false == this.bInit)
            return undefined;
        return this.pool.getPool(db);
    }
    /** procedure 얻기 */
    getProcedure(db, type) {
        return new type().initialize(this.getPool(db), this.logger);
    }
    getRedisCommand(type) {
        return new type().initialize(this.redis, this.logger);
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=StorageService.js.map