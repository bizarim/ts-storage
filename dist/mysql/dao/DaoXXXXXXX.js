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
const index_1 = require("../index");
const ProviderQuery_1 = require("../query/ProviderQuery");
/**
 * [ User Procedure ]
 * DaoXXXXXXX
 */
class DaoXXXXXXX extends index_1.TRExector {
    initialize(pool, logger) {
        super.initialize(pool, logger);
        this.query = new ProviderQuery_1.ProviderQuery(logger);
        return this;
    }
    initParams(code, token, nonce) {
        return this;
    }
    release() {
        super.release();
        this.query.release();
    }
    onQuery(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            // todo biz
            return {
                errcode: ts_common_1.eErrorCode.Success,
                context: {}
            };
        });
    }
}
exports.DaoXXXXXXX = DaoXXXXXXX;
//# sourceMappingURL=DaoXXXXXXX.js.map