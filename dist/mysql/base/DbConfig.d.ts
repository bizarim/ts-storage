import { PoolOptions } from 'mysql2/promise';
export declare class DbConfig {
    dbs: {
        [key: string]: PoolOptions;
    };
}
