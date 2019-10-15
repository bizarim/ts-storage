import { eErrorCode, IUpResult } from 'ts-common';
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
    release(): void;
    addProcedure(trmanual: TRManual): void;
    execute(): Promise<RsUpManual>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
export declare class RsUpManual implements IUpResult {
    errcode: eErrorCode;
    context: any[];
    constructor(err?: eErrorCode);
}
/**
 * 수동 트랜잭션 처리 관리자
 */
export declare class TRManualMgr implements ITRManualMgr {
    completes: Array<TRManual>;
    list: Array<TRManual>;
    fails: Array<TRManual>;
    constructor();
    release(): void;
    addProcedure(trmanual: TRManual): void;
    execute(): Promise<RsUpManual>;
    rollback(): Promise<void>;
    commit(): Promise<void>;
}
