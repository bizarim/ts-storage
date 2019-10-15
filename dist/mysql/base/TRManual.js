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
 *  수동 트랜잭션
 */
class TRManual extends AbsDbExector_1.AbsDbExector {
    constructor() {
        super(...arguments);
        this.isCommand = false;
    }
    release() {
        this.isCommand = false;
        super.release();
    }
    // 커맨드 처리
    command() {
        return __awaiter(this, void 0, void 0, function* () {
            if (undefined === this.dbBehavior)
                return new ts_common_1.UrtError(ts_common_1.eErrorCode.DB_ERROR_CONN);
            // 1. check init
            if (this.err !== ts_common_1.eErrorCode.Success) {
                return this.createErrOnEx(this.err);
            }
            // 2. check open
            try {
                yield this.dbBehavior.open();
            }
            catch (ex) {
                this.logEx(ex, 'conn open error');
                return this.createErrOnEx(ex);
            }
            // 3. excute
            try {
                yield this.dbBehavior.beginTransaction();
                const result = yield this.onQuery(this.dbBehavior.getConn());
                this.isCommand = true;
                return result;
            }
            catch (ex) {
                this.logEx(ex, 'command error');
                return this.createErrOnEx(ex); // error
            }
        });
    }
    // 커밋 처리
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (false === this.isCommand) {
                this.release();
                return;
            }
            if (undefined === this.dbBehavior) {
                this.release();
                return;
            }
            try {
                yield this.dbBehavior.commit();
            }
            catch (ex) {
                this.logEx(ex, 'commit error');
            }
            try {
                this.dbBehavior.release();
            }
            catch (ex) {
                this.logEx(ex, 'release error');
            }
            this.release();
        });
    }
    // 롤백 처리
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            if (false === this.isCommand) {
                this.release();
                return;
            }
            if (undefined === this.dbBehavior) {
                this.release();
                return;
            }
            try {
                yield this.dbBehavior.rollback();
            }
            catch (ex) {
                this.logEx(ex, 'rollback error');
            }
            try {
                this.dbBehavior.release();
            }
            catch (ex) {
                this.logEx(ex, 'release error');
            }
            this.release();
        });
    }
}
exports.TRManual = TRManual;
//# sourceMappingURL=TRManual.js.map