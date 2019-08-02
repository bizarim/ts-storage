import { PoolConnection } from 'mysql2/promise';
export interface IDbConn {
    release(): void;
    open(): Promise<void>;
    getConn(): PoolConnection | undefined;
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
