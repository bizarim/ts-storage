import { IUpResult, ILogger } from 'ts-common';
import { RedisClients } from './RedisClients';
/**
 * interface User Redis
 */
export interface IRedsExector {
    initialize(clients: RedisClients, logger?: ILogger): IRedsExector;
    release(): void;
    execute(): Promise<IUpResult>;
}
