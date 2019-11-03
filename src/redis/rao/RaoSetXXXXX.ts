import { eErrorCode, IUpResult, UrtError, UrtResult, Global } from 'ts-common';
import { RedisAccessObject } from '../base/RedisAccessObject';
import { RedisSchema } from '../keyMapper/RedisSchema';
import { RedisClients, eRedisDb } from '../base/RedisClients';
import { RedisException, IRedsExector, RhoProvider } from '..';

/**
 * redis access object
 * RaoSetXXXXX
 */
export class RaoSetXXXXX extends RedisAccessObject {
    private pvKey: string;
    private tkKey: string;

    constructor() {
        super();
    }

    initParam(code: string, tokenAccess: string): IRedsExector {
        this.pvKey = RedisSchema
            .getProvider()
            .getKey(code);

        this.tkKey = RedisSchema
            .getToken()
            .getKey(tokenAccess);
        return this;
    }

    release() {
        super.release();
    }

    async onHandle(clinets: RedisClients): Promise<IUpResult> {

        return {
            errcode: eErrorCode.Success,
        } as UrtResult;
    }

}
