import { IDbExector } from '../base/IDbExector';
import { PoolConnection, Pool } from 'mysql2/promise';
import { IUpResult, UrtError } from 'ts-common/dist/interface';
import { eErrCode } from 'ts-common/dist/enums';
import { DbConn } from './DbConn';
/**
 * 쿼리 실행자 추상클래스
 */
export declare class AbsDbExector implements IDbExector {
    logger?: any;
    protected err: eErrCode;
    protected dbConn?: DbConn;
    constructor(pool: Pool);
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
