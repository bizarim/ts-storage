import { ISharedService, ILogger, eDb, ConfigLoader } from 'ts-common';
import { IRedsExector, Pool, IDbExector } from '..';
import { StorageConfig } from './StorageConfig';
export declare class StorageService implements ISharedService {
    private logger?;
    private pool;
    private redis;
    protected loader: ConfigLoader;
    protected config: StorageConfig;
    private bInit;
    initialize(path: string, logger?: ILogger): Promise<void>;
    /** Repository connection pool 얻기 */
    protected getPool(db: eDb): Pool | undefined;
    /** procedure 얻기 */
    getProcedure<T extends IDbExector>(db: eDb, type: {
        new (): T;
    }): T;
    getRedisCommand<T extends IRedsExector>(type: {
        new (): T;
    }): T;
}
