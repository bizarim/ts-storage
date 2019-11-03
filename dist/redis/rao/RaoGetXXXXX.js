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
const RedisAccessObject_1 = require("../base/RedisAccessObject");
const ts_common_1 = require("ts-common");
const RedisSchema_1 = require("../keyMapper/RedisSchema");
const RedisClients_1 = require("../base/RedisClients");
/**
 * redis access object
 * RaoGetXXXXX
 */
class RaoGetXXXXX extends RedisAccessObject_1.RedisAccessObject {
    constructor() {
        super();
    }
    /**
     *
     * @param code 서비스 제공자 code
     * @param token access token
     */
    initParam(code, token, nonce) {
        this.code = code;
        this.token = token;
        this.nonce = nonce;
        this.pvKey = RedisSchema_1.RedisSchema
            .getProvider()
            .getKey(code);
        this.tkKey = RedisSchema_1.RedisSchema
            .getToken()
            .getKey(token);
        return this;
    }
    release() {
        super.release();
    }
    onHandle(clinets) {
        return __awaiter(this, void 0, void 0, function* () {
            const redisPv = clinets.get(RedisClients_1.eRedisDb.provider);
            if (undefined === redisPv)
                return new ts_common_1.UrtError(ts_common_1.eErrorCode.REDIS_CONN_ERROR);
            const redisTk = clinets.get(RedisClients_1.eRedisDb.token);
            if (undefined === redisTk)
                return new ts_common_1.UrtError(ts_common_1.eErrorCode.REDIS_CONN_ERROR);
            return {
                errcode: ts_common_1.eErrorCode.Success,
            };
        });
    }
}
exports.RaoGetXXXXX = RaoGetXXXXX;
//# sourceMappingURL=RaoGetXXXXX.js.map