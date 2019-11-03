import { PoolConnection, SqlDate } from '../index';
export declare class DbQuery {
    release(): void;
    getNow(connection: PoolConnection): Promise<SqlDate>;
    /**
     * insert 쿼리 확인용
     * @param rows query 결과 rows
     */
    assertInsert(rows: any): void;
    /**
     * update 쿼리 확인용 ALL
     * @param rows query 결과 rows
     */
    assertUpdate(rows: any): void;
    /**
     * update 쿼리 확인용 WithOut Change
     * @param rows query 결과 rows
     */
    assertUpdateWithOutChange(rows: any): void;
    /**
     * db 반영 체크
     * @param rows query 결과 rows
     */
    checkAffectedRows(rows: any): boolean;
    /**
     * rows 변경점 체크
     * @param rows query 결과 rows
     */
    checkChangedRows(rows: any): boolean;
    /**
     * get LAST_INSERT_ID
     * @param rows query 결과 rows
     */
    getLastInsertId(rows: any): any;
    /**
     * deepCopy
     * @param rows query 결과 rows
     * @param type dto 타입
     */
    deepCopy(rows: any): any;
}
