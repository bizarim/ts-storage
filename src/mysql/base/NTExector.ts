import { eErrorCode, IUpResult, UrtError } from 'ts-common';
import { AbsDbExector } from './AbsDbExector';
import { PoolConnection } from '../index';

/**
 * None Transaction Exector
 * None 트랜잭션 쿼리 실행자 구현 클래스
 */
export class NTExector extends AbsDbExector {

    release() {
        super.release();
    }

    async execute(): Promise<IUpResult> {
        if (undefined === this.dbBehavior) return new UrtError(eErrorCode.DB_ERROR_CONN);
        if (this.err !== eErrorCode.Success) return new UrtError(this.err);

        try {

            await this.dbBehavior.open();

        } catch (err) {
            this.logEx(err, 'error on connection open');
            return new UrtError(eErrorCode.DB_ERROR_CONN);
        }

        try {
            const pconn = this.dbBehavior.getConn() as PoolConnection;
            const result = await this.onQuery(pconn);
            this.dbBehavior.release();

            try {

                return this.onResult(result);
            } catch (err) {

                this.logEx(err, 'error on result');
                return this.createErrOnEx(err);
            }

        } catch (err) {

            this.dbBehavior.release();
            this.loggingQueryError(err);
            return this.createErrOnEx(err);

        } finally {
            this.release();
        }
    }
}
