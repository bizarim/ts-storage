import { ILogger, IUpResult } from 'ts-common';
import { Pool, PoolConnection, TRExector, IDbExector } from '../index';
/**
 * [ User Procedure ]
 * DaoXXXXXXX
 */
export declare class DaoXXXXXXX extends TRExector {
    private query;
    initialize(pool: Pool, logger?: ILogger): IDbExector;
    initParams(code: string, token: string, nonce: number): TRExector;
    release(): void;
    onQuery(conn: PoolConnection): Promise<IUpResult>;
}
