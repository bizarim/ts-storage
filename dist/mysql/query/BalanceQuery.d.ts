import { ILogger, eBalanceStatus, eTransType } from 'ts-common';
import { DbQuery } from '../base';
import { PoolConnection, RtsBalance, RtsBalanceStatement, RtsSum } from '..';
export declare class BalanceQuery extends DbQuery {
    logger?: ILogger;
    constructor(logger?: ILogger);
    addBalance(conn: PoolConnection, memberId: number, coin: string, balance: number, status: eBalanceStatus): Promise<void>;
    getBalance(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsBalance>>;
    getBalanceWithLock(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsBalance>>;
    updateBalance(conn: PoolConnection, memberId: number, coin: string, amount: number): Promise<void>;
    updateBalanceWithStatus(conn: PoolConnection, memberId: number, coin: string, amount: number, status: eBalanceStatus): Promise<void>;
    updateBalanceStatus(conn: PoolConnection, memberId: number, coin: string, status: eBalanceStatus): Promise<void>;
    addBalanceStatement(conn: PoolConnection, memberId: number, coin: string, amount: number, type: eTransType, linkCode: string): Promise<void>;
    getSumBalanceStatement(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsSum>>;
    getBalanceStatement(conn: PoolConnection, memberId: number, coin: string, page: number, offset: number): Promise<Array<RtsBalanceStatement>>;
    getBalanceStatementByPluse(conn: PoolConnection, memberId: number, coin: string, page: number, offset: number): Promise<Array<RtsBalanceStatement>>;
    getBalanceStatementByMinus(conn: PoolConnection, memberId: number, coin: string, page: number, offset: number): Promise<Array<RtsBalanceStatement>>;
}
