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
const AbsDbExector_1 = require("./AbsDbExector");
/**
 * None Transaction Exector
 * None 트랜잭션 쿼리 실행자 구현 클래스
 */
class NTExector extends AbsDbExector_1.AbsDbExector {
    release() {
        super.release();
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (undefined === this.dbBehavior)
                return new ts_common_1.UrtError(ts_common_1.eErrorCode.DB_ERROR_CONN);
            if (this.err !== ts_common_1.eErrorCode.Success)
                return new ts_common_1.UrtError(this.err);
            try {
                yield this.dbBehavior.open();
            }
            catch (err) {
                this.logEx(err, 'error on connection open');
                return new ts_common_1.UrtError(ts_common_1.eErrorCode.DB_ERROR_CONN);
            }
            try {
                const pconn = this.dbBehavior.getConn();
                const result = yield this.onQuery(pconn);
                this.dbBehavior.release();
                try {
                    return this.onResult(result);
                }
                catch (err) {
                    this.logEx(err, 'error on result');
                    return this.createErrOnEx(err);
                }
            }
            catch (err) {
                this.dbBehavior.release();
                this.loggingQueryError(err);
                return this.createErrOnEx(err);
            }
            finally {
                this.release();
            }
        });
    }
}
exports.NTExector = NTExector;
//# sourceMappingURL=NTExector.js.map