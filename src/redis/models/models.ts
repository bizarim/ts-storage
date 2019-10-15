import { IUpResult, eErrorCode } from 'ts-common';

export class RtsRedisProvider {
    id: string;
    tokenAccess: string;
    tokenRefresh: string;
    nonce: number;
}
export class UrtGetRedisProvider implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsRedisProvider;
}

export class RtsRedisWallet {
    id: string;
    coin: string;
    passphrase: string;
}

export class UrtGetRedisWallet implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsRedisWallet;
}

export class UrtRedisSchedulerBlocks implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: string[] | undefined;
}

export class RtsRedisAddress {
    memberId: number;
    coin: string;
    address: string;
}


export class UrtRedisAddress implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsRedisAddress | undefined;
}

