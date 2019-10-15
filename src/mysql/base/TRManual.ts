import { eErrorCode, IUpResult, UrtError } from 'ts-common';
import { AbsDbExector } from './AbsDbExector';
import { PoolConnection } from '../index';

/**
 *  수동 트랜잭션
 */
export class TRManual extends AbsDbExector {
    private isCommand: boolean = false;

    release() {
        this.isCommand = false;
        super.release();
    }

    // 커맨드 처리
    async command(): Promise<IUpResult> {
        if (undefined === this.dbBehavior) return new UrtError(eErrorCode.DB_ERROR_CONN);
        // 1. check init
        if (this.err !== eErrorCode.Success) {
            return this.createErrOnEx(this.err);
        }

        // 2. check open
        try {
            await this.dbBehavior.open();
        } catch (ex) {
            this.logEx(ex, 'conn open error');
            return this.createErrOnEx(ex);
        }

        // 3. excute
        try {
            await this.dbBehavior.beginTransaction();
            const result = await this.onQuery(this.dbBehavior.getConn() as PoolConnection);
            this.isCommand = true;
            return result;
        } catch (ex) {
            this.logEx(ex, 'command error');
            return this.createErrOnEx(ex);                  // error
        }
    }

    // 커밋 처리
    async commit() {
        if (false === this.isCommand) {
            this.release();
            return;
        }
        if (undefined === this.dbBehavior) {
            this.release();
            return;
        }
        try { await this.dbBehavior.commit(); } catch (ex) {
            this.logEx(ex, 'commit error');
        }
        try { this.dbBehavior.release(); } catch (ex) {
            this.logEx(ex, 'release error');
        }

        this.release();
    }

    // 롤백 처리
    async rollback() {
        if (false === this.isCommand) {
            this.release();
            return;
        }
        if (undefined === this.dbBehavior) {
            this.release();
            return;
        }

        try { await this.dbBehavior.rollback(); } catch (ex) {
            this.logEx(ex, 'rollback error');
        }

        try { this.dbBehavior.release(); } catch (ex) {
            this.logEx(ex, 'release error');
        }

        this.release();
    }

}
