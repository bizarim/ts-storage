import { ILogger, IUpResult, eErrorCode, generateKey, Global, UrtResult } from 'ts-common';
import { Pool, PoolConnection, TRExector, IDbExector, SqlDate } from '../index';
import { ProviderQuery } from '../query/ProviderQuery';
import { UrtRegenTokenAccess } from '../resultset';
import { DbException } from '../exception';

/**
 * [ User Procedure ]
 * DaoXXXXXXX
 */
export class DaoXXXXXXX extends TRExector {
    private query: ProviderQuery;

    initialize(pool: Pool, logger?: ILogger): IDbExector {
        super.initialize(pool, logger);
        this.query = new ProviderQuery(logger);
        return this;
    }

    initParams(code: string, token: string, nonce: number): TRExector {
        return this;
    }

    release(): void {
        super.release();
        this.query.release();
    }

    async onQuery(conn: PoolConnection): Promise<IUpResult> {
        // todo biz
        return {
            errcode: eErrorCode.Success,
            context: {}
        } as UrtResult;
    }

}

