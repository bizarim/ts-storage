import { IResultSet, eTransState, eBalanceStatus, eTransType } from 'ts-common';

/**
 * resultset : Provider 정의
 */
export class RtsProviderDefine implements IResultSet {
    code: string;
    providerKey: string;
    name: string;
}

/**
 * resultset : Provider
 */
export class RtsProvider implements IResultSet {
    code: string;
    id: string;
    regDate: string;
}

export class RtsProviderWithToken {
    id: string;
    tokenAccess: string;
    tokenRefresh: string;
    nonce: number;
}

export class RtsProviderRegister implements IResultSet {
    providerId: string;
    accessToken: string;
    refreshToken: string;
    accessExpireSec: number;
}

/**
 * resultset : Provider
 */
export class RtsJoinProvider implements IResultSet {
    providerKey: string;
    id: string;
    code: string;
}

/**
 * resultset : Provider 계정
 */
export class RtsProviderAccount implements IResultSet {
    id: string;
    uuid: string;
    type: string;
    alias: string;
    regDate: string;
}

/**
 * resultset : access token
 */
export class RtsTokenAccess implements IResultSet {
    id: string;
    token: string;
    nonce: number;
    expireDate: string;
}

/**
 * resultset : refresh token
 */
export class RtsTokenRefresh implements IResultSet {
    id: string;
    token: string;
}


/**
 * resultset : refresh token
 */
export class RtsWallet implements IResultSet {
    providerId: string;
    coin: string;
    status: number;
}

/**
 * passphrase
 */
export class RtsPassPhrase implements IResultSet {
    id: string;
    coin: string;
    passphrase: string;
    status: number;
}

/**
 * resultset : Provider 계정
 */
export class RtsMember implements IResultSet {
    id: number;
    providerId: string;
    uuid: string;
    regDate: string;
}



export class RtsBalance implements IResultSet {
    memberId: number;
    coin: string;
    balance: number;
    status: eBalanceStatus;
}

export class RtsAddress implements IResultSet {
    memberId: number;
    coin: string;
    address: string;
}

export class RtsSum implements IResultSet {
    sum: number;
}


export class RtsBalanceStatement implements IResultSet {
    memberId: number;
    coin: string;
    amount: number;
    type: eTransType;
    linkCode: string;
}

export class RtsLedger implements IResultSet {
    memberId: number;
    coin: string;
    balance: number;
    status: number;
}

export class RtsLedgerStatement implements IResultSet {
    memberId: number;
    coin: string;
    type: string;
    rpcCode: string;
    toFromAddress: string;
    amount: number;
    commission: number;
}

export class RtsLedgerTransaction implements IResultSet {
    rpcCode: string;
    providerId: string;
    coin: string;
    txId: string;
    fee: number;
    status: eTransState;
}


export class RtsSchedulerBlock implements IResultSet {
    providerId: string;
    coin: string;
    block: string;
    txid: string;
    type: string;
    done: number;
}


export class RtsLedgerTransactionWithJoin implements IResultSet {
    memberId: number;
    type: eTransType;
    toFormAddress: string;
}