import { IUpResult, ILogger } from 'ts-common';
import { Redis } from '../../index';
import { RedisClients } from './RedisClients';

/**
 * interface User Redis
 */
export interface IRedsExector {
    initialize(clients: RedisClients, logger?: ILogger): IRedsExector;
    // 자원 해제
    release(): void;
    // 비동기 실행
    execute(): Promise<IUpResult>;
}