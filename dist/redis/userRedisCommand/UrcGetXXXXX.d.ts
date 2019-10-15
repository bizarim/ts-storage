import { AbsRedisCommand } from '../base/AbsRedisCommand';
import { IUpResult } from 'ts-common';
import { RedisClients } from '../base/RedisClients';
import { IRedsExector } from '..';
/**
 * user redis commnad
 * UrcGetXXXXX
 */
export declare class UrcGetXXXXX extends AbsRedisCommand {
    pvKey: string;
    tkKey: string;
    code: string;
    token: string;
    nonce?: number;
    constructor();
    /**
     *
     * @param code 서비스 제공자 code
     * @param token access token
     */
    initParam(code: string, token: string, nonce?: number): IRedsExector;
    release(): void;
    onHandle(clinets: RedisClients): Promise<IUpResult>;
}
