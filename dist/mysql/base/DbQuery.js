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
const exception_1 = require("../exception");
class DbQuery {
    release() {
    }
    getNow(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT NOW() AS now;';
            const [rows] = yield connection.query(query);
            const list = this.deepCopy(rows);
            return new index_1.SqlDate(new Date(list[0].now));
        });
    }
    /**
     * insert 쿼리 확인용
     * @param rows query 결과 rows
     */
    assertInsert(rows) {
        if (false === this.checkAffectedRows(rows)) {
            throw new exception_1.DbException(ts_common_1.eErrorCode.DB_ERROR_ISR_AffectedRows);
        }
    }
    /**
     * update 쿼리 확인용 ALL
     * @param rows query 결과 rows
     */
    assertUpdate(rows) {
        if (false === this.checkAffectedRows(rows)) {
            throw new exception_1.DbException(ts_common_1.eErrorCode.DB_ERROR_UP_AffectedRows);
        }
        if (false === this.checkChangedRows(rows)) {
            throw new exception_1.DbException(ts_common_1.eErrorCode.DB_ERROR_UP_ChangedRows);
        }
    }
    /**
     * update 쿼리 확인용 WithOut Change
     * @param rows query 결과 rows
     */
    assertUpdateWithOutChange(rows) {
        if (false === this.checkAffectedRows(rows)) {
            throw new exception_1.DbException(ts_common_1.eErrorCode.DB_ERROR_UP_AffectedRows);
        }
    }
    /**
     * db 반영 체크
     * @param rows query 결과 rows
     */
    checkAffectedRows(rows) {
        if (undefined === rows.affectedRows)
            return false;
        if (null === rows.affectedRows)
            return false;
        if (rows.affectedRows < 1)
            return false;
        return true;
    }
    /**
     * rows 변경점 체크
     * @param rows query 결과 rows
     */
    checkChangedRows(rows) {
        if (undefined === rows.changedRows)
            return false;
        if (null === rows.changedRows)
            return false;
        if (rows.changedRows < 1)
            return false;
        return true;
    }
    /**
     * get LAST_INSERT_ID
     * @param rows query 결과 rows
     */
    getLastInsertId(rows) {
        return rows.insertId;
    }
    /**
     * deepCopy
     * @param rows query 결과 rows
     * @param type dto 타입
     */
    // deepCopy<T>(rows: any, type: { new(): T ; } ): T {
    // todo [ MUST BE ]
    // 속도 개선 적은 량에서는 큰차이 없지만 select 량이 많아 지면
    // 성능에서 차이가 난다.
    // 성능에 영향을 주는 건 Object.assign을 사용 하거나
    // deepCopy 구현을 수정해야한다.
    //     return Object.assign(new type(), rows);
    //     // return JSON.parse(JSON.stringify(rows));
    // }
    deepCopy(rows) {
        return JSON.parse(JSON.stringify(rows));
    }
}
exports.DbQuery = DbQuery;
//# sourceMappingURL=DbQuery.js.map