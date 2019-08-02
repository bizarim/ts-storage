import { createPool, Pool } from 'mysql2/promise';
import { eDbEnum } from 'ts-common/dist/enums';
import { IDbPools } from '../base/IDbPools';
import { DbConfig } from '../base/DbConfig';

export class DbPools implements IDbPools {
  private pools: { [key: string]: Pool };

  constructor() {
    this.pools = {};
  }

  public async initialize(config: DbConfig): Promise<void> {

    Object.keys(config.dbs).forEach(element => {

      this.pools[element] = createPool(config.dbs[element]);
    });

  }

  public getPool(db: eDbEnum): Pool {
    return this.pools[db.toString()];
  }

}
