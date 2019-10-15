import { ILogger, eBalanceStatus, eTransType,  } from 'ts-common';
import { DbQuery } from '../base';
import { PoolConnection, RtsBalance, RtsBalanceStatement, RtsSum } from '..';


export class BalanceQuery extends DbQuery {
    public logger?: ILogger;
    constructor(logger?: ILogger) {
        super();
        this.logger = logger;
    }

    // addBalance
    async addBalance(conn: PoolConnection, memberId: number, coin: string, balance: number, status: eBalanceStatus): Promise<void> {
        const query = `
            INSERT INTO tBalance(memberId,coin,balance,status)
            VALUES(?,?,?,?);`;
        const [rows] = await conn.query(query, [memberId, coin, balance, status]);
        this.assertInsert(rows);
    }

    async getBalance(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsBalance>> {
        const query = `
            SELECT  memberId,
                    coin,
                    balance,
                    status
            FROM    tBalance
            WHERE   memberId = ? AND coin = ?;`;
        const [rows] = await conn.query(query, [memberId, coin]);
        return this.deepCopy(rows) as RtsBalance[];
    }

    async getBalanceWithLock(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsBalance>> {
        const query = `
            SELECT  memberId,
                    coin,
                    balance,
                    status
            FROM    tBalance
            WHERE   memberId = ? AND coin = ? FOR UPDATE;`;
        const [rows] = await conn.query(query, [memberId, coin]);
        return this.deepCopy(rows) as RtsBalance[];
    }

    async updateBalance(conn: PoolConnection, memberId: number, coin: string, amount: number): Promise<void> {
        const query = `
            UPDATE  tBalance
            SET     balance = ?
            WHERE   memberId = ? AND coin = ?;`;
        const [rows] = await conn.query(query, [amount, memberId, coin]);
        this.assertUpdate(rows);
    }

    async updateBalanceWithStatus(conn: PoolConnection, memberId: number, coin: string, amount: number, status: eBalanceStatus): Promise<void> {
        const query = `
            UPDATE  tBalance
            SET     balance = ?,
                    status = ?
            WHERE   memberId = ? AND coin = ?;`;
        const [rows] = await conn.query(query, [amount, status, memberId, coin]);
        this.assertUpdate(rows);
    }

    async updateBalanceStatus(conn: PoolConnection, memberId: number, coin: string, status: eBalanceStatus): Promise<void> {
        const query = `
            UPDATE  tBalance
            SET     status = ?
            WHERE   memberId = ? AND coin = ?;`;
        const [rows] = await conn.query(query, [status, memberId, coin]);
        this.assertUpdate(rows);
    }

    async addBalanceStatement(conn: PoolConnection, memberId: number, coin: string, amount: number, type: eTransType, linkCode: string): Promise<void> {
        const query = `
            INSERT INTO tBalanceStatement(memberId,coin,amount,type,linkCode)
            VALUES(?,?,?,?,?);`;
        const [rows] = await conn.query(query, [memberId, coin, amount, type, linkCode]);
        this.assertInsert(rows);
    }


    async getSumBalanceStatement(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsSum>> {
        const query = `
            SELECT  COUNT(*) as sum
            FROM    tBalanceStatement
            WHERE   memberId = ? AND coin = ?;`;
        const [rows] = await conn.query(query, [memberId, coin]);
        return this.deepCopy(rows) as RtsSum[];
    }

    async getBalanceStatement(conn: PoolConnection, memberId: number, coin: string, page: number, offset: number): Promise<Array<RtsBalanceStatement>> {
        const query = `
            SELECT
                    memberId,
                    coin,
                    amount,
                    type,
                    linkCode
            FROM    tBalanceStatement
            WHERE   memberId = ? AND coin = ?
            ORDER   BY regDate DESC
            LIMIT   ?, ?;`;
        const [rows] = await conn.query(query, [memberId, coin, (page - 1) * offset, (page * offset)]);
        return this.deepCopy(rows) as RtsBalanceStatement[];
    }

    async getBalanceStatementByPluse(conn: PoolConnection, memberId: number, coin: string, page: number, offset: number): Promise<Array<RtsBalanceStatement>> {
        const query = `
            SELECT
                    memberId,
                    coin,
                    amount,
                    type,
                    linkCode
            FROM    tBalanceStatement
            WHERE   memberId = ? AND coin = ? AND amount > 0
            ORDER BY regDate DESC
            LIMIT   ?, ?;`;
        const [rows] = await conn.query(query, [memberId, coin, (page - 1) * offset, (page * offset)]);
        return this.deepCopy(rows) as RtsBalanceStatement[];
    }

    async getBalanceStatementByMinus(conn: PoolConnection, memberId: number, coin: string, page: number, offset: number): Promise<Array<RtsBalanceStatement>> {
        const query = `
            SELECT
                    memberId,
                    coin,
                    amount,
                    type,
                    linkCode
            FROM    tBalanceStatement
            WHERE   memberId = ? AND coin = ? AND amount < 0
            ORDER BY regDate DESC
            LIMIT   ?, ?;`;
        const [rows] = await conn.query(query, [memberId, coin, (page - 1) * offset, (page * offset)]);
        return this.deepCopy(rows) as RtsBalanceStatement[];
    }

}
