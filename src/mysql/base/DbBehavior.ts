import { eErrorCode } from 'ts-common';
import { IDbBehavior } from './Interfaces';
import { Pool, PoolConnection } from '../index';
import { DbException } from '../exception';

/**
 * 구현 db 행동자
 */
export class DbBehavior implements IDbBehavior {
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
            throw new DbException(eErrorCode.DB_ERROR_CONN);
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
