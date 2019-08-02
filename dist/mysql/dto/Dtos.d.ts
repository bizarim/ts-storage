import { SqlDate } from './SqlDate';
import { IDto } from 'ts-common/dist/interface';
export declare class DtoNow implements IDto {
    now: SqlDate;
}
export declare class DtoTest implements IDto {
    c1: number;
    c2: number;
    c3: number;
}
