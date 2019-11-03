import { eErrorCode } from 'ts-common';
export declare class RedisException extends Error {
    code: eErrorCode;
    constructor(code: eErrorCode);
}
