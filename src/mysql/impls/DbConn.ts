import { PoolConnection, Pool } from 'mysql2/promise';
import { eErrCode } from 'ts-common/dist/enums';
import { IDbConn } from '../base/IDbConn';

export class DbConn implements IDbConn {
  private pool?: Pool;
  private conn?: PoolConnection;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  getConn(): PoolConnection | undefined {
    return this.conn;
  }

  release(): void {

    if (undefined !== this.conn) {
      // this.conn.destroy()
      this.conn.release();
      this.conn = undefined;
    }

  }

  async open(): Promise<void> {
    if (undefined === this.pool) {
      throw (eErrCode.DB_ERROR_CONN);
    }
    this.conn = await this.pool.getConnection();
  }

  async beginTransaction(): Promise<void> {
    if (undefined === this.conn) return;
    await this.conn.beginTransaction();
  }

  async commit(): Promise<void> {
    if (undefined === this.conn) return;
    await this.conn.commit();
  }

  async rollback(): Promise<void> {
    if (undefined === this.conn) return;
    await this.conn.rollback();
  }

}
