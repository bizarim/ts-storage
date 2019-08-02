import { PoolOptions } from 'mysql2/promise';

export class DbConfig {
  public dbs: { [key: string]: PoolOptions };
}
