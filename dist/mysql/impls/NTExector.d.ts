import { Pool } from 'mysql2/promise';
import { IUpResult } from 'ts-common/dist/interface';
import { AbsDbExector } from './AbsDbExector';
/**
 * None Transaction Exector
 * None 트랜잭션 쿼리 실행자 구현 클래스
 */
export declare class NTExector extends AbsDbExector {
    constructor(pool: Pool);
    release(): void;
    execute(): Promise<IUpResult>;
}
