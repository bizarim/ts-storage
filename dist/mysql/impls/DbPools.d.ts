import { Pool } from 'mysql2/promise';
import { eDbEnum } from 'ts-common/dist/enums';
import { IDbPools } from '../base/IDbPools';
import { DbConfig } from '../base/DbConfig';
export declare class DbPools implements IDbPools {
    private pools;
    constructor();
    initialize(config: DbConfig): Promise<void>;
    getPool(db: eDbEnum): Pool;
}
