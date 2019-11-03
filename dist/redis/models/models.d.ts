import { IUpResult, eErrorCode } from 'ts-common';
export declare class RtsRedisProvider {
    id: string;
    tokenAccess: string;
    tokenRefresh: string;
    nonce: number;
}
export declare class UrtGetRedisProvider implements IUpResult {
    errcode: eErrorCode;
    context: RtsRedisProvider;
}
export declare class RtsRedisWallet {
    id: string;
    coin: string;
    passphrase: string;
}
export declare class UrtGetRedisWallet implements IUpResult {
    errcode: eErrorCode;
    context: RtsRedisWallet;
}
export declare class UrtRedisSchedulerBlocks implements IUpResult {
    errcode: eErrorCode;
    context: string[] | undefined;
}
export declare class RtsRedisAddress {
    memberId: number;
    coin: string;
    address: string;
}
export declare class UrtRedisAddress implements IUpResult {
    errcode: eErrorCode;
    context: RtsRedisAddress | undefined;
}
