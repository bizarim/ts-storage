import * as IORedis from 'ioredis';
import { ILogger } from 'ts-common';
export declare type handleMessage = (topic: string, message: string) => void;
export declare class RedisPubSub {
    protected client: IORedis.Redis | undefined;
    protected logger: ILogger | undefined;
    private ip;
    private port;
    private bInit;
    constructor(logger: ILogger | undefined, ip: string, port: number);
    initialize(func?: handleMessage): void;
    publish(topic: string, message: string): Promise<void>;
    subscribe(topic: string): void;
}
