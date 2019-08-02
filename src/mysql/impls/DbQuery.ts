import { PoolConnection } from 'mysql2/promise';
import { eErrCode } from 'ts-common/dist/enums';
import { SqlDate } from '../dto/SqlDate';

export class DbQuery {

  release() {
    // todo
  }

  async getNow(connection: PoolConnection) {    // 시간 얻어오기
    const query = 'SELECT NOW() AS now;';
    const [rows] = await connection.query(query);
    return new SqlDate(new Date(rows[0].now));
  }
    // insert 쿼리 확인용
  assertInsert(rows) {
    if (false === this.checkAffectedRows(rows)) {
      throw (eErrCode.DB_ERROR_ISR);
    }
  }
    // update 쿼리 확인용 ALL
  assertUpdate(rows) {
    if (false === this.checkAffectedRows(rows)) {
      throw (eErrCode.DB_ERROR_UP1);
    }
    if (false === this.checkChangedRows(rows)) {
      throw (eErrCode.DB_ERROR_UP2);
    }
  }
    // update 쿼리 확인용 WithOut Change
  assertUpdateWithOutChange(rows) {
    if (false === this.checkAffectedRows(rows)) {
      throw (eErrCode.DB_ERROR_UP1);
    }
  }
    // row 대상 확인
  checkAffectedRows(rows) {
    if (undefined === rows.affectedRows) return false;
    if (null === rows.affectedRows) return false;
    if (rows.affectedRows < 1) return false;
    return true;
  }
    // row 변경 확인
  checkChangedRows(rows) {
    if (undefined === rows.changedRows) return false;
    if (null === rows.changedRows) return false;
    if (rows.changedRows < 1) return false;
    return true;
  }

  deepCopy(rows: any): any {
    return JSON.parse(JSON.stringify(rows));
  }
}
