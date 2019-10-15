import { eDb } from 'ts-common';
import { IDbPools } from './Interfaces';
import { createPool, Pool } from '../index';
import { DbConfig } from '../base/DbConfig';

export class DbPools implements IDbPools {
    private pools: { [key: string]: Pool };

    constructor() {
        this.pools = {};
    }

    public async initialize(config: DbConfig | any): Promise<void> {
        Object.keys(config.dbs).forEach(element => {
            this.pools[element] = createPool(config.dbs[element]);
        });

    }

    public getPool(db: eDb): Pool | undefined {
        return this.pools[`${db}`];
    }

}
