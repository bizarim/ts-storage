import { eDb } from 'ts-common';
import { IDbPools } from './Interfaces';
import { Pool } from '../index';
import { DbConfig } from '../base/DbConfig';
export declare class DbPools implements IDbPools {
    private pools;
    constructor();
    initialize(config: DbConfig | any): Promise<void>;
    getPool(db: eDb): Pool | undefined;
}
