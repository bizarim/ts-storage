import { IDbBehavior } from './Interfaces';
import { Pool, PoolConnection } from '../index';
/**
 * 구현 db 행동자
 */
export declare class DbBehavior implements IDbBehavior {
    private pool?;
    private conn?;
    constructor(pool: Pool);
    getConn(): PoolConnection | undefined;
    release(): void;
    open(): Promise<void>;
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
