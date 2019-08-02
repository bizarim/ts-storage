import { IUpResult } from 'ts-common/dist/interface';
import { eErrCode } from 'ts-common/dist/enums';
import { TRManual } from './TRManual';

/**
 * ITRManualMgr.js
 * 트랜잭션 관리자 인터페이스
 *  - 서로 다른 물리 db에서 Transaction 보장을 위한 프로 시져 실행을 목적으로 한다.
 *  - 실행
 *  - 커밋
 *  - 롤백
 */
export interface ITRManualMgr {
    // 리소르 해제
  release(): void;
    // 프로시져 추가
  addProcedure(trmanual: TRManual): void;
    // 실행
  execute(): Promise<RsUpManual>;
    // 커밋
  commit(): Promise<void>;
    // 롤백
  rollback(): Promise<void>;
}

export class RsUpManual implements IUpResult {
  err: eErrCode;
  list: any[];

  constructor(err: eErrCode = eErrCode.Success) {
    this.err = err;
  }

  toResponse(): any {
    return undefined;
  }
}

/**
 * 수동 트랜잭션 처리 관리자
 */
export class TRManualMgr implements ITRManualMgr {

  completes: Array<TRManual>; // 완료 리스트
  list: Array<TRManual>;     // 실행 리스트
  fails: Array<TRManual>;    // 실패 리스트
  constructor() {
    this.list = [];
    this.completes = [];
    this.fails = [];
  }

  release() {
    delete this.list;
    delete this.list;
    delete this.completes;
  }

  addProcedure(trmanual: TRManual) {
        // if (undefined === this.list) {
        //   this.list = []
        // }
    this.list.push(trmanual);
  }

  async execute(): Promise<RsUpManual> {
    const result = new RsUpManual();
    try {
      let err = eErrCode.Success;
      const cnt = this.list.length;
      for (let i = 0; i < cnt; ++i) {
        const ptu = this.list.shift() as TRManual;
        const rt = await ptu.command();
        if (eErrCode.Success !== rt.err) {
          err = rt.err;
          result.err = rt.err;
          this.fails.push(ptu);
          break;
        }

        this.completes.push(ptu);
        result.list.push(rt);
      }

      if (eErrCode.Success !== err) {
        await this.rollback();
      } else {
        await this.commit();
      }
    } catch (ex) {
            // _logger.error(ex)
      return new RsUpManual(eErrCode.DB_ERROR);
    } finally {
      this.release();
    }

    return result;
  }

  async rollback() {
    const ccnt = this.completes.length;
    for (let i = 0; i < ccnt; ++i) {
      const ptu = this.completes.shift() as TRManual;
      await ptu.rollback();
    }

    const lcnt = this.list.length;
    for (let i = 0; i < lcnt; ++i) {
      const ptu = this.list.shift() as TRManual;
      await ptu.rollback();
    }

    const fcnt = this.fails.length;
    for (let i = 0; i < fcnt; ++i) {
      const ptu = this.fails.shift() as TRManual;
      await ptu.rollback();
    }
  }

  async commit() {
    const ccnt = this.completes.length;
    for (let i = 0; i < ccnt; ++i) {
      const ptu = this.completes.shift() as TRManual;
      await ptu.commit();
    }

    const lcnt = this.list.length;
    for (let i = 0; i < lcnt; ++i) {
      const ptu = this.list.shift() as TRManual;
      await ptu.commit();
    }
  }
}
