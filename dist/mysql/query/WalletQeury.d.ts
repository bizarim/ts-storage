import { ILogger, eReqWallet } from 'ts-common';
import { DbQuery } from '../base';
import { PoolConnection, RtsWallet, RtsMember, RtsPassPhrase, RtsAddress } from '..';
export declare class WalletQuery extends DbQuery {
    logger?: ILogger;
    constructor(logger?: ILogger);
    getWalletWithLock(conn: PoolConnection, providerId: string, coin: string): Promise<Array<RtsWallet>>;
    getPassPhrase(conn: PoolConnection, providerId: string, coin: string): Promise<Array<RtsPassPhrase>>;
    addWallet(conn: PoolConnection, providerId: string, coin: string, passphrase: string, status: eReqWallet): Promise<RtsWallet>;
    updateWallet(conn: PoolConnection, id: string, coin: string, status: eReqWallet): Promise<void>;
    addMemeber(conn: PoolConnection, providerId: string, uuid: string): Promise<number>;
    getMemeber(conn: PoolConnection, providerId: string, uuid: string): Promise<Array<RtsMember>>;
    addAddress(conn: PoolConnection, memberId: number, coin: string, address: string): Promise<void>;
    getAddress(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsAddress>>;
}
