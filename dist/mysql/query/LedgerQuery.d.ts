import { ILogger, eTransState, ParamsUpSendCoinsPending } from 'ts-common';
import { DbQuery } from '../base';
import { PoolConnection, RtsLedgerStatement, RtsLedgerTransaction, ParamsUpDeposite, RtsLedgerTransactionWithJoin, RtsSum } from '..';
export declare class LedgerQuery extends DbQuery {
    logger?: ILogger;
    constructor(logger?: ILogger);
    getSumOfLedgerUnspentList(conn: PoolConnection, providerId: string, coin: string): Promise<Array<RtsSum>>;
    addLedgerUnspentList(conn: PoolConnection, param: ParamsUpDeposite): Promise<void>;
    addLedgerUnspentListBySend(conn: PoolConnection, coin: string, address: string, providerId: string, txid: string, amount: number): Promise<void>;
    updateLedgerUnspentList(conn: PoolConnection, txid: string): Promise<void>;
    addLedgerStatementToSend(conn: PoolConnection, coin: string, params: ParamsUpSendCoinsPending, rpcCode: string): Promise<void>;
    addLedgerStatementToRecv(conn: PoolConnection, param: ParamsUpDeposite, rpcCode: string): Promise<void>;
    getSumLedgerStatement(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsSum>>;
    getLedgerStatement(conn: PoolConnection, memberId: number, coin: string, page: number, offset: number): Promise<Array<RtsLedgerStatement>>;
    addLedgerTransaction(conn: PoolConnection, rpcCode: string, providerId: string, coin: string, txId: string, fee: number, status: eTransState): Promise<void>;
    updateLedgerTransaction(conn: PoolConnection, coin: string, txId: string, status: eTransState): Promise<void>;
    getLedgerTransaction(conn: PoolConnection, coin: string, txId: string): Promise<Array<RtsLedgerTransaction>>;
    getLedgerTransactionsWithList(conn: PoolConnection, coin: string, txList: string[]): Promise<Array<RtsLedgerTransaction>>;
    getLedgerTransactionWithJoin(conn: PoolConnection, coin: string, txId: string): Promise<Array<RtsLedgerTransactionWithJoin>>;
}
