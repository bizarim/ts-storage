import { IResultSet, eTransState, eBalanceStatus, eTransType } from 'ts-common';
/**
 * resultset : Provider 정의
 */
export declare class RtsProviderDefine implements IResultSet {
    code: string;
    providerKey: string;
    name: string;
}
/**
 * resultset : Provider
 */
export declare class RtsProvider implements IResultSet {
    code: string;
    id: string;
    regDate: string;
}
export declare class RtsProviderWithToken {
    id: string;
    tokenAccess: string;
    tokenRefresh: string;
    nonce: number;
}
export declare class RtsProviderRegister implements IResultSet {
    providerId: string;
    accessToken: string;
    refreshToken: string;
    accessExpireSec: number;
}
/**
 * resultset : Provider
 */
export declare class RtsJoinProvider implements IResultSet {
    providerKey: string;
    id: string;
    code: string;
}
/**
 * resultset : Provider 계정
 */
export declare class RtsProviderAccount implements IResultSet {
    id: string;
    uuid: string;
    type: string;
    alias: string;
    regDate: string;
}
/**
 * resultset : access token
 */
export declare class RtsTokenAccess implements IResultSet {
    id: string;
    token: string;
    nonce: number;
    expireDate: string;
}
/**
 * resultset : refresh token
 */
export declare class RtsTokenRefresh implements IResultSet {
    id: string;
    token: string;
}
/**
 * resultset : refresh token
 */
export declare class RtsWallet implements IResultSet {
    providerId: string;
    coin: string;
    status: number;
}
/**
 * passphrase
 */
export declare class RtsPassPhrase implements IResultSet {
    id: string;
    coin: string;
    passphrase: string;
    status: number;
}
/**
 * resultset : Provider 계정
 */
export declare class RtsMember implements IResultSet {
    id: number;
    providerId: string;
    uuid: string;
    regDate: string;
}
export declare class RtsBalance implements IResultSet {
    memberId: number;
    coin: string;
    balance: number;
    status: eBalanceStatus;
}
export declare class RtsAddress implements IResultSet {
    memberId: number;
    coin: string;
    address: string;
}
export declare class RtsSum implements IResultSet {
    sum: number;
}
export declare class RtsBalanceStatement implements IResultSet {
    memberId: number;
    coin: string;
    amount: number;
    type: eTransType;
    linkCode: string;
}
export declare class RtsLedger implements IResultSet {
    memberId: number;
    coin: string;
    balance: number;
    status: number;
}
export declare class RtsLedgerStatement implements IResultSet {
    memberId: number;
    coin: string;
    type: string;
    rpcCode: string;
    toFromAddress: string;
    amount: number;
    commission: number;
}
export declare class RtsLedgerTransaction implements IResultSet {
    rpcCode: string;
    providerId: string;
    coin: string;
    txId: string;
    fee: number;
    status: eTransState;
}
export declare class RtsSchedulerBlock implements IResultSet {
    providerId: string;
    coin: string;
    block: string;
    txid: string;
    type: string;
    done: number;
}
export declare class RtsLedgerTransactionWithJoin implements IResultSet {
    memberId: number;
    type: eTransType;
    toFormAddress: string;
}
