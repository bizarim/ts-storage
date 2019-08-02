import { PoolConnection } from 'mysql2/promise';
import { SqlDate } from '../dto/SqlDate';
export declare class DbQuery {
    release(): void;
    getNow(connection: PoolConnection): Promise<SqlDate>;
    assertInsert(rows: any): void;
    assertUpdate(rows: any): void;
    assertUpdateWithOutChange(rows: any): void;
    checkAffectedRows(rows: any): boolean;
    checkChangedRows(rows: any): boolean;
    deepCopy(rows: any): any;
}
