import { ISharedService, ILogger, eDb, ConfigLoader } from 'ts-common';
import { DbPools, IRedsExector, Pool, IDbExector, RedisClients } from '..';
import { StorageConfig } from './StorageConfig';

export class StorageService implements ISharedService {
    private logger?: ILogger;
    private pool: DbPools;
    private redis: RedisClients;
    protected loader: ConfigLoader;
    protected config: StorageConfig;
    private bInit: boolean = false;
    async initialize(path: string, logger?: ILogger): Promise<void> {
        this.logger = logger;
        this.loader = new ConfigLoader();
        this.config = this.loader.toJson(path) as StorageConfig;

        this.pool = new DbPools();
        this.redis = new RedisClients();

        await this.pool.initialize(this.config);
        this.redis.initialize(this.config.redis.ip, this.config.redis.port);
        this.bInit = true;
    }

    /** Repository connection pool 얻기 */
    protected getPool(db: eDb): Pool | undefined {
        if (false == this.bInit) return undefined;
        return this.pool.getPool(db);
    }

    /** procedure 얻기 */
    public getProcedure<T extends IDbExector>(db: eDb, type: { new(): T; }): T {
        return new type().initialize(this.getPool(db) as Pool, this.logger) as T;
    }

    public getRedisCommand<T extends IRedsExector>(type: { new(): T; }): T {
        return new type().initialize(this.redis, this.logger) as T;
    }

}