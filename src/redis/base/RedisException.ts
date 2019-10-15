import { eErrorCode } from 'ts-common';

export class RedisException extends Error {
    public code: eErrorCode = eErrorCode.Success;

    constructor(code: eErrorCode) {
        super();
        this.code = code;
        this.message = 'RedisException';
    }
}