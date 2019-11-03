import { RedisAccessObject } from '../base/RedisAccessObject';
import { eErrorCode, IUpResult, UrtError } from 'ts-common';
import { RedisSchema } from '../keyMapper/RedisSchema';
import { RtsRedisProvider, UrtGetRedisProvider } from '../models/models';
import { RedisClients, eRedisDb } from '../base/RedisClients';
import { IRedsExector } from '..';
import { RhoProvider } from '../keyMapper';

/**
 * redis access object
 * RaoGetXXXXX
 */
export class RaoGetXXXXX extends RedisAccessObject {
    pvKey: string;
    tkKey: string;
    code: string;
    token: string;
    nonce?: number;
    constructor() {
        super();
    }

    /**
     *
     * @param code 서비스 제공자 code
     * @param token access token
     */
    initParam(code: string, token: string, nonce?: number): IRedsExector {
        this.code = code;
        this.token = token;
        this.nonce = nonce;
        this.pvKey = RedisSchema
            .getProvider()
            .getKey(code);
        this.tkKey = RedisSchema
            .getToken()
            .getKey(token);

        return this;
    }

    release() {
        super.release();
    }

    async onHandle(clinets: RedisClients): Promise<IUpResult> {

        const redisPv = clinets.get(eRedisDb.provider);
        if (undefined === redisPv) return new UrtError(eErrorCode.REDIS_CONN_ERROR);
        const redisTk = clinets.get(eRedisDb.token);
        if (undefined === redisTk) return new UrtError(eErrorCode.REDIS_CONN_ERROR);


        return {
            errcode: eErrorCode.Success,
        } as UrtGetRedisProvider;
    }

}
