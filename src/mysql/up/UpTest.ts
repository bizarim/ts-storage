import { Pool, PoolConnection } from 'mysql2/promise';
import { IUpResult } from 'ts-common/dist/interface';
import { NTExector } from '../impls/NTExector';
import { TestQuery } from '../query/TestQuery';
import { UrtTest } from '../impls/UpResult';

// import TRExector from '../impls/TRExector'

export class UpTest extends NTExector {
  logger: any;
  query: TestQuery;
  constructor(pool: Pool) {
    super(pool);
    this.query = new TestQuery();
  }

  release(): void {
    // super.release()
    this.query.release();
  }

  async onQuery(conn: PoolConnection): Promise<IUpResult> {
    const result = new UrtTest();
    result.list = await this.query.test(conn, 1);
    return result;
  }

  onResult(result: IUpResult): IUpResult {
    return result;
  }

}
