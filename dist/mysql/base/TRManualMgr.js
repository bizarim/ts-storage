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
class RsUpManual {
    constructor(err = ts_common_1.eErrorCode.Success) {
        this.errcode = err;
    }
}
exports.RsUpManual = RsUpManual;
/**
 * 수동 트랜잭션 처리 관리자
 */
class TRManualMgr {
    constructor() {
        this.list = [];
        this.completes = [];
        this.fails = [];
    }
    release() {
        delete this.list;
        delete this.list;
        delete this.completes;
    }
    addProcedure(trmanual) {
        // if (undefined === this.list) {
        //   this.list = []
        // }
        this.list.push(trmanual);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = new RsUpManual();
            try {
                let err = ts_common_1.eErrorCode.Success;
                const cnt = this.list.length;
                for (let i = 0; i < cnt; ++i) {
                    const ptu = this.list.shift();
                    const rt = yield ptu.command();
                    if (ts_common_1.eErrorCode.Success !== rt.errcode) {
                        err = rt.errcode;
                        result.errcode = rt.errcode;
                        this.fails.push(ptu);
                        break;
                    }
                    this.completes.push(ptu);
                    result.context.push(rt);
                }
                if (ts_common_1.eErrorCode.Success !== err) {
                    yield this.rollback();
                }
                else {
                    yield this.commit();
                }
            }
            catch (ex) {
                // _logger.error(ex)
                return new RsUpManual(ts_common_1.eErrorCode.DB_ERROR);
            }
            finally {
                this.release();
            }
            return result;
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            const ccnt = this.completes.length;
            for (let i = 0; i < ccnt; ++i) {
                const ptu = this.completes.shift();
                yield ptu.rollback();
            }
            const lcnt = this.list.length;
            for (let i = 0; i < lcnt; ++i) {
                const ptu = this.list.shift();
                yield ptu.rollback();
            }
            const fcnt = this.fails.length;
            for (let i = 0; i < fcnt; ++i) {
                const ptu = this.fails.shift();
                yield ptu.rollback();
            }
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            const ccnt = this.completes.length;
            for (let i = 0; i < ccnt; ++i) {
                const ptu = this.completes.shift();
                yield ptu.commit();
            }
            const lcnt = this.list.length;
            for (let i = 0; i < lcnt; ++i) {
                const ptu = this.list.shift();
                yield ptu.commit();
            }
        });
    }
}
exports.TRManualMgr = TRManualMgr;
//# sourceMappingURL=TRManualMgr.js.map