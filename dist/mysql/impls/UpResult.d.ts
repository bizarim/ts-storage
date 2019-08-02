import { IUpResult, IDto } from 'ts-common/dist/interface';
import { eErrCode } from 'ts-common/dist/enums';
export declare class UrtTest implements IUpResult {
    err: eErrCode;
    list: IDto[];
    toResponse(): any;
}
