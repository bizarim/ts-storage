import { IUpResult } from 'ts-common';
import { AbsDbExector } from './AbsDbExector';
/**
 * Transaction Exector
 * 트랜잭션 쿼리 실행자 구현 클래스
 */
export declare class TRExector extends AbsDbExector {
    release(): void;
    execute(): Promise<IUpResult>;
}
