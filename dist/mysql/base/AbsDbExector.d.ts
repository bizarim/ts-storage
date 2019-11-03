import { eErrorCode, IUpResult, UrtError, ILogger } from 'ts-common';
import { IDbExector } from './Interfaces';
import { DbBehavior } from './DbBehavior';
import { Pool, PoolConnection } from '../index';
export declare class AbsDbExector implements IDbExector {
    logger?: ILogger;
    protected err: eErrorCode;
    protected dbBehavior?: DbBehavior;
    initialize(pool: Pool, logger?: ILogger): IDbExector;
    release(): void;
    execute(): Promise<IUpResult>;
    onQuery(conn: PoolConnection): Promise<IUpResult>;
    onResult(result: IUpResult): IUpResult;
    command(): Promise<IUpResult>;
    createErrOnEx(ex: any): UrtError;
    createErr(): UrtError;
    logEx(ex: any, msg: string): void;
    loggingQueryError(ex: any): void;
}
