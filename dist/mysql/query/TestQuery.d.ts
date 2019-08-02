import { PoolConnection } from 'mysql2/promise';
import { IDto } from 'ts-common/dist/interface';
import { DbQuery } from '../impls/DbQuery';
export declare class TestQuery extends DbQuery {
    constructor();
    test(connection: PoolConnection, accIdx: number): Promise<Array<IDto>>;
    test2(connection: PoolConnection): Promise<void>;
}
