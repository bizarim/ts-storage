import { eErrorCode } from 'ts-common';
export declare class DbException extends Error {
    code: eErrorCode;
    constructor(code: eErrorCode);
}
