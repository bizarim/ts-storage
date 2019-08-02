import { PoolConnection, Pool } from 'mysql2/promise';
import { IDbConn } from '../base/IDbConn';
export declare class DbConn implements IDbConn {
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
