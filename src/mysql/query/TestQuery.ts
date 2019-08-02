import { PoolConnection } from 'mysql2/promise';
import { IDto } from 'ts-common/dist/interface';
import { DbQuery } from '../impls/DbQuery';
import { DtoTest } from '../dto/Dtos';

export class TestQuery extends DbQuery {

  constructor() {
    super();
  }

// 테스트 코드
  async test(connection: PoolConnection, accIdx: number): Promise<Array<IDto>> {
    const query = 'SELECT c1, c2, c3 FROM tTest';
    const [rows] = await connection.query(query);
    const list: Array<DtoTest> = this.deepCopy(rows);
    return list;
  }

  async test2(connection: PoolConnection) {
    const result: Array<IDto> = await this.test(connection, 1);
    result.forEach(element => {
      const aa: DtoTest = element as DtoTest;
      console.log(aa);
    });
  }
}
