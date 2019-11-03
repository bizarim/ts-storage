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
    /**
     * Database Access Object
     * @param db 물리 db
     * @param dao dao
     */
    getDao<T extends IDbExector>(db: eDb, dao: {
        new (): T;
    }): T;
    /**
     * Redis Access Object
     * @param rao rao
     */
    getRao<T extends IRedsExector>(rao: {
        new (): T;
    }): T;
}
