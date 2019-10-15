import { IServiceConfig } from 'ts-common';
import { PoolOptions } from '..';
export declare class StorageConfig implements IServiceConfig {
    env: string;
    dbs: {
        [key: string]: PoolOptions;
    };
    redis: {
        ip: string;
        port: number;
    };
}
