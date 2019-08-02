import { PoolConnection } from 'mysql2/promise';
import { IUpResult } from 'ts-common/dist/interface';
export interface IDbLogging {
    logger?: any;
    createErrOnEx(ex: any): IUpResult;
    createErr(): IUpResult;
    logEx(ex: any, msg: string): void;
    loggingQueryError(ex: any): void;
}
/**
 *  쿼리 실행자 인터페이스
 */
export interface IDbExector extends IDbLogging {
    release(): void;
    execute(): Promise<IUpResult>;
    onQuery(conn: PoolConnection): Promise<IUpResult>;
    onResult(result: IUpResult): IUpResult;
    command(): Promise<IUpResult>;
}
