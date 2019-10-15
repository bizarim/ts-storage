import { AbsRedisCommand } from '../base/AbsRedisCommand';
import { eErrorCode, IUpResult, UrtError } from 'ts-common';
import { RedisSchema } from '../keyMapper/RedisSchema';
import { RtsRedisProvider, UrtGetRedisProvider } from '../models/models';
import { RedisClients, eRedisDb } from '../base/RedisClients';
import { IRedsExector } from '..';
import { RhoProvider } from '../keyMapper';

/**
 * user redis commnad
 * UrcGetXXXXX
 */
export class UrcGetXXXXX extends AbsRedisCommand {
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


        const rtPv = await redisPv.hgetall(this.pvKey) as RhoProvider;
        if (undefined === rtPv || null === rtPv) return new UrtError(eErrorCode.REDIS_ERROR);
        if (undefined === rtPv.id) return new UrtError(eErrorCode.UnmanagedProvider);
        if (undefined !== this.nonce) {
            if (this.nonce <= rtPv.nonce) return new UrtError(eErrorCode.InvalidRequest);
        }

        const rtTk = await redisTk.get(this.tkKey);
        if (undefined === rtTk || null === rtTk) {
            return new UrtError(eErrorCode.ExpireTokenAccess);
        }

        // const tt = await redisPv.multi().hset('test', '', '').expire('test', 10);
        const target = new RtsRedisProvider();
        // string으로 나왔었나? object로 나왔었나?
        Object.assign(target, rtPv);    // deepCopy

        return {
            errcode: eErrorCode.Success,
            context: target
        } as UrtGetRedisProvider;
    }

}
