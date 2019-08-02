import { Pool, PoolConnection } from 'mysql2/promise';
import { eErrCode } from 'ts-common/dist/enums';
import { IUpResult, UrtError } from 'ts-common/dist/interface';
import { AbsDbExector } from './AbsDbExector';

/**
 * Transaction Exector
 * 트랜잭션 쿼리 실행자 구현 클래스
 */
export class TRExector extends AbsDbExector {
  constructor(pool: Pool) {
    super(pool);
  }

  release() {
    super.release();
  }

  async execute(): Promise<IUpResult> {
    if (undefined === this.dbConn) return new UrtError(eErrCode.DB_ERROR_CONN);
    if (this.err !== eErrCode.Success) return new UrtError(this.err);

    try {
      await this.dbConn.open();

      try {

        await this.dbConn.beginTransaction();
        const pconn = this.dbConn.getConn() as PoolConnection;
        const result = await this.onQuery(pconn);
        await this.dbConn.commit();
        this.dbConn.release();

        try {

          return this.onResult(result);

        } catch (err) {
          this.logEx(err, 'error on result');
          return this.createErrOnEx(err);
        }

      } catch (err) {
        await this.dbConn.rollback();
        this.dbConn.release();
        this.loggingQueryError(err);
        return this.createErrOnEx(err);
      }

    } catch (err) {

      this.logEx(err, 'error on connection open');
      return new UrtError(eErrCode.DB_ERROR);

    } finally {

      this.release();

    }
  }
}
