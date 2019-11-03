import { eErrorCode, ILogger, UrtError, IUpResult } from 'ts-common';
import { IRedsExector } from './IRedsExector';
import { RedisClients } from './RedisClients';
/**
 * Redis Access Object
 */
export declare abstract class RedisAccessObject implements IRedsExector {
    logger?: ILogger;
    error: eErrorCode;
    clinets?: RedisClients;
    abstract onHandle(clinets: RedisClients): Promise<IUpResult>;
    initialize(clinets: RedisClients, logger: ILogger): IRedsExector;
    release(): void;
    execute(): Promise<IUpResult>;
    createErrOnEx(ex: any): UrtError;
    createErr(): UrtError;
    logEx(ex: any, msg: string): void;
    loggingQueryError(ex: any): void;
}
