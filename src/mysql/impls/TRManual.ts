import { PoolConnection } from 'mysql2/promise';
import { eErrCode } from 'ts-common/dist/enums';
import { IUpResult, UrtError } from 'ts-common/dist/interface';
import { AbsDbExector } from './AbsDbExector';

/**
 *  수동 트랜잭션
 */
export class TRManual extends AbsDbExector {
  private isCommand: boolean;
  constructor(pool) {
    super(pool);
    this.isCommand = false;
  }

  release() {
    this.isCommand = false;
    super.release();
  }

    // 커맨드 처리
  async command(): Promise<IUpResult> {
    if (undefined === this.dbConn) return new UrtError(eErrCode.DB_ERROR_CONN);
        // 1. check init
    if (this.err !== eErrCode.Success) {
      return this.createErrOnEx(this.err);
    }

        // 2. check open
    try {
      await this.dbConn.open();
    } catch (ex) {
      this.logEx(ex, 'conn open error');
      return this.createErrOnEx(ex);
    }

        // 3. excute
    try {
      await this.dbConn.beginTransaction();
      const result = await this.onQuery(this.dbConn.getConn() as PoolConnection);
      this.isCommand = true;
      return result;
    } catch (ex) {
      this.logEx(ex, 'command error');
      return this.createErrOnEx(ex);                  // error
    }
  }

    // 커밋 처리
  async commit() {
    if (false === this.isCommand) {
      this.release();
      return;
    }
    if (undefined === this.dbConn) {
      this.release();
      return;
    }
    try { await this.dbConn.commit(); } catch (ex) {
      this.logEx(ex, 'commit error');
    }
    try { this.dbConn.release(); } catch (ex) {
      this.logEx(ex, 'release error');
    }

    this.release();
  }

    // 롤백 처리
  async rollback() {
    if (false === this.isCommand) {
      this.release();
      return;
    }
    if (undefined === this.dbConn) {
      this.release();
      return;
    }

    try { await this.dbConn.rollback(); } catch (ex) {
      this.logEx(ex, 'rollback error');
    }

    try { this.dbConn.release(); } catch (ex) {
      this.logEx(ex, 'release error');
    }

    this.release();
  }

}
