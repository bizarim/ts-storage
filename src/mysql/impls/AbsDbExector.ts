import { IDbExector } from '../base/IDbExector';
import { PoolConnection, Pool } from 'mysql2/promise';
import { IUpResult, UrtError } from 'ts-common/dist/interface';
import { eErrCode } from 'ts-common/dist/enums';
import { DbConn } from './DbConn';

/**
 * 쿼리 실행자 추상클래스
 */
export class AbsDbExector implements IDbExector {
  // private ILogger todo
  logger?: any;
  protected err: eErrCode;
  protected dbConn?: DbConn;
  constructor(pool: Pool) {
    this.dbConn = new DbConn(pool);
    this.err = eErrCode.Success;
  }
  release(): void {
    // if (undefined !== this.conn) {
    //   this.conn.release()
    //   this.conn = undefined
    // }
    // this.err = undefined
  }
  execute(): Promise<IUpResult> {
    throw new Error('Method not implemented.');

  }
  async onQuery(conn: PoolConnection): Promise<IUpResult> {
    throw new Error('Method not implemented.');
  }
  onResult(result: IUpResult): IUpResult {
    // throw new Error('Method not implemented.')
    return result;
  }
  command(): Promise<IUpResult> {
    throw new Error('Method not implemented.');
  }

  createErrOnEx(ex: any) {
    const errcode: eErrCode | undefined = Object.values(eErrCode).find(o => o === ex);
    if (undefined === errcode) return new UrtError(eErrCode.DB_ERROR);
    else return new UrtError(errcode);
  }

  createErr() {
    return new UrtError(eErrCode.DB_ERROR);
  }

  logEx(ex: any, msg: string): void {
    if (undefined === this.logger) {
      console.log('logger undefined');
      console.log(msg);
      console.log(ex);
      return;
    }

    this.logger.error(msg);
    if (undefined !== ex.message) {
      this.logger.error(ex.message);
      this.logger.error(ex.stack);
    } else {
      this.logger.error('errcode: ' + ex);
    }
  }

  loggingQueryError(ex: any): void {
    if (undefined === this.logger) {
      console.log('logger undefined');
      console.log(ex);
      return;
    }
    if (undefined !== ex.message) {
      this.logger.error(ex.message);
      this.logger.error(ex.stack);
    }
  }
}
