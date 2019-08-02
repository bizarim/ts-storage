import { SqlDate } from './SqlDate';
import { IDto } from 'ts-common/dist/interface';

export class DtoNow implements IDto {
  public now: SqlDate;
}

export class DtoTest implements IDto {
  public c1: number;
  public c2: number;
  public c3: number;
}
