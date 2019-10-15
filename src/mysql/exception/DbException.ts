import { eErrorCode } from 'ts-common';

export class DbException extends Error {
    public code: eErrorCode = eErrorCode.Success;

    constructor(code: eErrorCode) {
        super();
        this.code = code;
        this.message = 'DbException';
    }
}