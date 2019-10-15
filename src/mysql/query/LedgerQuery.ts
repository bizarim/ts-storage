import { ILogger, eTransState, ParamsUpSendCoinsPending, eBalanceStatus } from 'ts-common';
import { DbQuery, Digit } from '../base';
import { PoolConnection, RtsLedgerStatement, RtsLedgerTransaction, ParamsUpDeposite, RtsLedgerTransactionWithJoin, RtsSum } from '..';


export class LedgerQuery extends DbQuery {
    public logger?: ILogger;
    constructor(logger?: ILogger) {
        super();
        this.logger = logger;
    }

    async getSumOfLedgerUnspentList(conn: PoolConnection, providerId: string, coin: string): Promise<Array<RtsSum>> {
        const query = `
            SELECT   Round(SUM(amount),?) AS sum
            FROM 	tLedgerUnspentList
            WHERE 	coin = ? AND providerId = ?;`;
        const [rows] = await conn.query(query, [Digit.get(coin), coin, providerId]);
        return this.deepCopy(rows) as RtsSum[];
    }

    async addLedgerUnspentList(conn: PoolConnection, param: ParamsUpDeposite): Promise<void> {
        const query = `
            INSERT INTO tLedgerUnspentList(coin,address,providerId,txid,amount)
            VALUES(?,?,?,?,?);`;
        const [rows] = await conn.query(query, [param.coin, param.address, param.providerId, param.txid, param.amount]);
        this.assertInsert(rows);
    }

    async addLedgerUnspentListBySend(conn: PoolConnection, coin: string, address: string, providerId: string, txid: string, amount: number): Promise<void> {
        const query = `
            INSERT INTO tLedgerUnspentList(coin,address,providerId,txid,amount)
            VALUES(?,?,?,?,?);`;
        const [rows] = await conn.query(query, [coin, address, providerId, txid, amount]);
        this.assertInsert(rows);
    }

    async updateLedgerUnspentList(conn: PoolConnection, txid: string): Promise<void> {
        const query = `
            UPDATE tLedgerUnspentList
            SET amount = 0
            WHERE txid = ?;`;
        const [rows] = await conn.query(query, [txid]);
        // todo
        // this.assertUpdateWithOutChange(rows);
    }

    async addLedgerStatementToSend(conn: PoolConnection, coin: string, params: ParamsUpSendCoinsPending, rpcCode: string): Promise<void> {
        const query = `
            INSERT INTO tLedgerStatement(memberId,coin,type,rpcCode,toFromAddress,amount,commission)
            VALUES(?,?,?,?,?,?,?);`;
        const [rows] = await conn.query(query, [params.memberId, coin, 'send', rpcCode, params.address, params.amount, params.commission]);
        this.assertInsert(rows);
    }

    async addLedgerStatementToRecv(conn: PoolConnection, param: ParamsUpDeposite, rpcCode: string): Promise<void> {
        const query = `
            INSERT INTO tLedgerStatement(memberId,coin,type,rpcCode,toFromAddress,amount,commission)
            VALUES(?,?,?,?,?,?,?);`;
        const [rows] = await conn.query(query, [param.memberId, param.coin, 'recv', rpcCode, '', param.amount, 0]);
        this.assertInsert(rows);
    }

    async getSumLedgerStatement(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsSum>> {
        const query = `
            SELECT  COUNT(*) as sum
            FROM    tLedgerStatement
            WHERE   memberId = ? AND coin = ?;`;
        const [rows] = await conn.query(query, [memberId, coin]);
        return this.deepCopy(rows) as RtsSum[];
    }

    async getLedgerStatement(conn: PoolConnection, memberId: number, coin: string, page: number, offset: number): Promise<Array<RtsLedgerStatement>> {
        const query = `
            SELECT
                    memberId,
                    coin,
                    type,
                    rpcCode,
                    toFromAddress,
                    amount,
                    commission
            FROM    tLedgerStatement
            WHERE   memberId = ? AND coin = ?
            ORDER BY regDate DESC
            LIMIT   ?, ?;`;
        const [rows] = await conn.query(query, [memberId, coin, (page - 1) * offset, (page * offset)]);
        return this.deepCopy(rows) as RtsLedgerStatement[];
    }

    async addLedgerTransaction(conn: PoolConnection, rpcCode: string, providerId: string, coin: string, txId: string, fee: number, status: eTransState): Promise<void> {
        const query = `
            INSERT INTO tLedgerTransaction(rpcCode,providerId,coin,txId,fee,status)
            VALUES(?,?,?,?,?,?);`;
        const [rows] = await conn.query(query, [rpcCode, providerId, coin, txId, fee, status]);
        this.assertInsert(rows);
    }

    async updateLedgerTransaction(conn: PoolConnection, coin: string, txId: string, status: eTransState): Promise<void> {
        const query = `
            UPDATE  tLedgerTransaction
            SET     status = ?
            WHERE   coin = ? AND txId = ?;`;
        const [rows] = await conn.query(query, [status, coin, txId]);
        this.assertInsert(rows);
    }
    async getLedgerTransaction(conn: PoolConnection, coin: string, txId: string): Promise<Array<RtsLedgerTransaction>> {
        const query = `
            SELECT
                    rpcCode,
                    providerId,
                    coin,
                    txId,
                    fee,
                    status
            FROM    tLedgerTransaction
            WHERE   coin = ? AND txId = ?;`;
        const [rows] = await conn.query(query, [coin, txId]);
        return this.deepCopy(rows) as RtsLedgerTransaction[];
    }

    async getLedgerTransactionsWithList(conn: PoolConnection, coin: string, txList: string[]): Promise<Array<RtsLedgerTransaction>> {
        const query = `
            SELECT
                    rpcCode,
                    providerId,
                    coin,
                    txId,
                    fee,
                    status
            FROM    tLedgerTransaction
            WHERE   coin = ? AND txId IN(?);`;
        const [rows] = await conn.query(query, [coin, txList]);
        return this.deepCopy(rows) as RtsLedgerTransaction[];
    }

    async getLedgerTransactionWithJoin(conn: PoolConnection, coin: string, txId: string): Promise<Array<RtsLedgerTransactionWithJoin>> {
        const query = `
            SELECT
                    ls.memberId,
                    ls.type,
                    ls.toFromAddress
            FROM 	tLedgerStatement AS ls
            JOIN 	tLedgerTransaction AS lt
            ON 		ls.rpcCode = lt.rpcCode
            WHERE 	lt.coin = ? AND lt.txId = ?;`;
        const [rows] = await conn.query(query, [coin, txId]);
        return this.deepCopy(rows) as RtsLedgerTransactionWithJoin[];
    }
}
