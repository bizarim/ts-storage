import { IUpResult } from 'ts-common';
import { RedisAccessObject } from '../base/RedisAccessObject';
import { RedisClients } from '../base/RedisClients';
import { IRedsExector } from '..';
/**
 * redis access object
 * RaoSetXXXXX
 */
export declare class RaoSetXXXXX extends RedisAccessObject {
    private pvKey;
    private tkKey;
    constructor();
    initParam(code: string, tokenAccess: string): IRedsExector;
    release(): void;
    onHandle(clinets: RedisClients): Promise<IUpResult>;
}
