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
const AbsRedisCommand_1 = require("../base/AbsRedisCommand");
const RedisSchema_1 = require("../keyMapper/RedisSchema");
/**
 * user redis commnad
 * UrcSetXXXXX
 */
class UrcSetXXXXX extends AbsRedisCommand_1.AbsRedisCommand {
    constructor() {
        super();
    }
    initParam(code, tokenAccess) {
        this.pvKey = RedisSchema_1.RedisSchema
            .getProvider()
            .getKey(code);
        this.tkKey = RedisSchema_1.RedisSchema
            .getToken()
            .getKey(tokenAccess);
        return this;
    }
    release() {
        super.release();
    }
    onHandle(clinets) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                errcode: ts_common_1.eErrorCode.Success,
            };
        });
    }
}
exports.UrcSetXXXXX = UrcSetXXXXX;
//# sourceMappingURL=UrcSetXXXXX.js.map