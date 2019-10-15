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
const exception_1 = require("../exception");
/**
 * 구현 db 행동자
 */
class DbBehavior {
    constructor(pool) {
        this.pool = pool;
    }
    getConn() {
        return this.conn;
    }
    release() {
        if (undefined !== this.conn) {
            // this.conn.destroy()
            this.conn.release();
            this.conn = undefined;
        }
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            if (undefined === this.pool) {
                throw new exception_1.DbException(ts_common_1.eErrorCode.DB_ERROR_CONN);
            }
            this.conn = yield this.pool.getConnection();
        });
    }
    beginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (undefined === this.conn)
                return;
            yield this.conn.beginTransaction();
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (undefined === this.conn)
                return;
            yield this.conn.commit();
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            if (undefined === this.conn)
                return;
            yield this.conn.rollback();
        });
    }
}
exports.DbBehavior = DbBehavior;
//# sourceMappingURL=DbBehavior.js.map