import { IUpResult, IDto } from 'ts-common/dist/interface';
import { eErrCode } from 'ts-common/dist/enums';

export class UrtTest implements IUpResult {
  err: eErrCode;
  list: IDto[];

  toResponse(): any {
    return undefined;
  }
}
