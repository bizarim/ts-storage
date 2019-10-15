import { eErrorCode, ILogger, UrtError, IUpResult } from 'ts-common';
import { IRedsExector } from './IRedsExector';
import { RedisClients } from './RedisClients';
/**
 * user redis command
 */
export declare class AbsRedisCommand implements IRedsExector {
    logger?: ILogger;
    error: eErrorCode;
    clinets?: RedisClients;
    protected constructor();
    initialize(clinets: RedisClients, logger: ILogger): IRedsExector;
    release(): void;
    protected onHandle(clinets: RedisClients): Promise<IUpResult>;
    execute(): Promise<IUpResult>;
    createErrOnEx(ex: any): UrtError;
    createErr(): UrtError;
    logEx(ex: any, msg: string): void;
    loggingQueryError(ex: any): void;
}
