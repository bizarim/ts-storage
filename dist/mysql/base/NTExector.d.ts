import { IUpResult } from 'ts-common';
import { AbsDbExector } from './AbsDbExector';
/**
 * None Transaction Exector
 * None 트랜잭션 쿼리 실행자 구현 클래스
 */
export declare class NTExector extends AbsDbExector {
    release(): void;
    execute(): Promise<IUpResult>;
}
