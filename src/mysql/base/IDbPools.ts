import { Pool } from 'mysql2/promise';
import { eDbEnum } from 'ts-common/dist/enums';
import { DbConfig } from './DbConfig';

export interface IDbPools {
  getPool(db: eDbEnum): Pool;
  initialize(config: DbConfig): Promise<void>;
}
