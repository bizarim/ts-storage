import { IUpResult } from 'ts-common';
import { AbsRedisCommand } from '../base/AbsRedisCommand';
import { RedisClients } from '../base/RedisClients';
import { IRedsExector } from '..';
/**
 * user redis commnad
 * UrcSetXXXXX
 */
export declare class UrcSetXXXXX extends AbsRedisCommand {
    private pvKey;
    private tkKey;
    constructor();
    initParam(code: string, tokenAccess: string): IRedsExector;
    release(): void;
    onHandle(clinets: RedisClients): Promise<IUpResult>;
}
