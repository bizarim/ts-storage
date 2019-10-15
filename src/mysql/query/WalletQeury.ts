import { ILogger, eReqWallet } from 'ts-common';
import { DbQuery } from '../base';
import { PoolConnection, RtsWallet, RtsMember, RtsPassPhrase, RtsAddress } from '..';


export class WalletQuery extends DbQuery {
    public logger?: ILogger;
    constructor(logger?: ILogger) {
        super();
        this.logger = logger;
    }

    async getWalletWithLock(conn: PoolConnection, providerId: string, coin: string): Promise<Array<RtsWallet>> {
        const query = `
            SELECT	providerId,
                    coin,
                    status
            FROM 	tWallet
            WHERE 	providerId = ? AND coin = ? FOR UPDATE`;
        const [rows] = await conn.query(query, [providerId, coin]);
        return this.deepCopy(rows) as Array<RtsWallet>;
    }

    async getPassPhrase(conn: PoolConnection, providerId: string, coin: string): Promise<Array<RtsPassPhrase>> {
        const query = `
            SELECT	providerId,
                    coin,
                    passphrase,
                    status
            FROM 	tWallet
            WHERE 	providerId = ? AND coin = ?`;
        const [rows] = await conn.query(query, [providerId, coin]);
        return this.deepCopy(rows) as Array<RtsPassPhrase>;
    }

    async addWallet(conn: PoolConnection, providerId: string, coin: string, passphrase: string, status: eReqWallet): Promise<RtsWallet> {
        const query = `
            INSERT INTO tWallet(providerId,coin,passphrase,status)
            VALUES(?,?,?,?);`;
        const [rows] = await conn.query(query, [providerId, coin, passphrase, status]);
        this.assertInsert(rows);
        return { providerId: providerId, coin: coin, status: status } as RtsWallet;
    }

    async updateWallet(conn: PoolConnection, id: string, coin: string, status: eReqWallet): Promise<void> {
        const query = `
            UPDATE  tWallet
            SET     status = ?
            WHERE   providerId = ? AND coin = ?;`;
        const [rows] = await conn.query(query, [status, id, coin]);
        this.assertUpdate(rows);
    }

    //
    async addMemeber(conn: PoolConnection, providerId: string, uuid: string): Promise<number> {
        const query = `
            INSERT INTO tMember(providerId,uuid)
            VALUES(?,?);`;
        const [rows] = await conn.query(query, [providerId, uuid]);
        this.assertInsert(rows);
        const memberId = this.getLastInsertId(rows) as number;
        return memberId;
    }

    async getMemeber(conn: PoolConnection, providerId: string, uuid: string): Promise<Array<RtsMember>> {
        const query = `
            SELECT  id,
                    providerId,
                    uuid
            FROM    tMember
            WHERE   providerId = ? AND uuid = ?;`;
        const [rows] = await conn.query(query, [providerId, uuid]);
        return this.deepCopy(rows) as RtsMember[];
    }
    //
    // addAddress
    async addAddress(conn: PoolConnection, memberId: number, coin: string, address: string): Promise<void> {
        const query = `
            INSERT INTO tAddress(memberId,coin,address)
            VALUES(?,?,?);`;
        const [rows] = await conn.query(query, [memberId, coin, address]);
        this.assertInsert(rows);
    }

    async getAddress(conn: PoolConnection, memberId: number, coin: string): Promise<Array<RtsAddress>> {
        const query = `
            SELECT  memberId,
                    coin,
                    address
            FROM    tAddress
            WHERE   memberId = ? AND coin = ?;`;
        const [rows] = await conn.query(query, [memberId, coin]);
        return this.deepCopy(rows) as RtsAddress[];
    }
}
