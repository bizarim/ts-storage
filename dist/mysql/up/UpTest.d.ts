import { Pool, PoolConnection } from 'mysql2/promise';
import { IUpResult } from 'ts-common/dist/interface';
import { NTExector } from '../impls/NTExector';
import { TestQuery } from '../query/TestQuery';
export declare class UpTest extends NTExector {
    logger: any;
    query: TestQuery;
    constructor(pool: Pool);
    release(): void;
    onQuery(conn: PoolConnection): Promise<IUpResult>;
    onResult(result: IUpResult): IUpResult;
}
