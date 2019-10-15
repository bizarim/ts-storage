import { eErrorCode, IUpResult, UrtError, ILogger } from 'ts-common';
import { IDbExector } from './Interfaces';
import { DbBehavior } from './DbBehavior';
import { Pool, PoolConnection } from '../index';
import { DbException } from '../exception';

export class AbsDbExector implements IDbExector {
    logger?: ILogger;
    protected err: eErrorCode;
    protected dbBehavior?: DbBehavior;

    initialize(pool: Pool, logger?: ILogger): IDbExector {
        this.err = eErrorCode.Success;
        this.dbBehavior = new DbBehavior(pool);
        this.logger = logger;
        return this;
    }

    release(): void {
        this.logger = undefined;
    }
    execute(): Promise<IUpResult> {
        throw new Error('Method not implemented.');

    }
    async onQuery(conn: PoolConnection): Promise<IUpResult> {
        throw new Error('Method not implemented.');
    }
    onResult(result: IUpResult): IUpResult {
        // throw new Error('Method not implemented.')
        return result;
    }
    command(): Promise<IUpResult> {
        throw new Error('Method not implemented.');
    }

    createErrOnEx(ex: any): UrtError {
        if (ex instanceof DbException) return new UrtError(ex.code);
        else return new UrtError(eErrorCode.DB_ERROR);
    }

    createErr(): UrtError {
        return new UrtError(eErrorCode.DB_ERROR);
    }

    logEx(ex: any, msg: string): void {
        if (undefined === this.logger) {
            console.log(msg);
            if (ex instanceof DbException) {
                console.log(ex.code);
            } else {
                console.log(ex.message);
                console.log(ex.stack);
            }
            return;
        }

        this.logger.error(msg);
        if (ex instanceof DbException) {
            this.logger.error('DbExector errcode: ' + ex.code);
        } else {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
    }

    loggingQueryError(ex: any): void {
        if (undefined === this.logger) {
            if (ex instanceof DbException) {
                console.log(ex.code);
            } else {
                console.log(ex.message);
                console.log(ex.stack);
            }
            return;
        }

        if (ex instanceof DbException) {
            this.logger.error('DbExector errcode: ' + ex.code);
        } else {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
    }

}