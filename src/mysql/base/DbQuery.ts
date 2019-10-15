import { eErrorCode, RtsNow } from 'ts-common';
import { PoolConnection, SqlDate } from '../index';
import { DbException } from '../exception';

export class DbQuery {

    release() {
    }

    async getNow(connection: PoolConnection): Promise<SqlDate> {    // 시간 얻어오기
        const query = 'SELECT NOW() AS now;';
        const [rows] = await connection.query(query);
        const list: Array<RtsNow> = this.deepCopy(rows);
        return new SqlDate(new Date(list[0].now));
    }

    /**
     * insert 쿼리 확인용
     * @param rows query 결과 rows
     */
    assertInsert(rows: any) {
        if (false === this.checkAffectedRows(rows)) {
            throw new DbException(eErrorCode.DB_ERROR_ISR_AffectedRows);
        }
    }

    /**
     * update 쿼리 확인용 ALL
     * @param rows query 결과 rows
     */
    assertUpdate(rows: any) {
        if (false === this.checkAffectedRows(rows)) {
            throw new DbException(eErrorCode.DB_ERROR_UP_AffectedRows);
        }
        if (false === this.checkChangedRows(rows)) {
            throw new DbException(eErrorCode.DB_ERROR_UP_ChangedRows);
        }
    }

    /**
     * update 쿼리 확인용 WithOut Change
     * @param rows query 결과 rows
     */
    assertUpdateWithOutChange(rows: any) {
        if (false === this.checkAffectedRows(rows)) {
            throw new DbException(eErrorCode.DB_ERROR_UP_AffectedRows);
        }
    }

    /**
     * db 반영 체크
     * @param rows query 결과 rows
     */
    checkAffectedRows(rows: any) {
        if (undefined === rows.affectedRows) return false;
        if (null === rows.affectedRows) return false;
        if (rows.affectedRows < 1) return false;
        return true;
    }

    /**
     * rows 변경점 체크
     * @param rows query 결과 rows
     */
    checkChangedRows(rows: any) {
        if (undefined === rows.changedRows) return false;
        if (null === rows.changedRows) return false;
        if (rows.changedRows < 1) return false;
        return true;
    }

    /**
     * get LAST_INSERT_ID
     * @param rows query 결과 rows
     */
    getLastInsertId(rows: any) {
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
    deepCopy(rows: any): any {
        return JSON.parse(JSON.stringify(rows));
    }
}
