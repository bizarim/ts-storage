import { ILogger } from 'ts-common';
import { DbQuery } from '../base';
import { PoolConnection,  RtsSchedulerBlock } from '..';


export class SchedulerQuery extends DbQuery {
    public logger?: ILogger;
    constructor(logger?: ILogger) {
        super();
        this.logger = logger;
    }

    async registerScheduler(conn: PoolConnection, providerId: string, coin: string, block: string, txid: string, type: string): Promise<void> {
        const query = `
            INSERT INTO tSchedulerBlock(providerId,coin,block,txid,type,done)
            VALUES(?,?,?,?,?,?);`;
        const [rows] = await conn.query(query, [providerId, coin, block, txid, type, 0]);
        this.assertInsert(rows);
    }

    async getSchedulerBlocks(conn: PoolConnection, coin: string, block: string): Promise<Array<RtsSchedulerBlock>> {
        const query = `
            SELECT  providerId,
                    coin,
                    block,
                    txid,
                    type,
                    done
            FROM    tSchedulerBlock
            WHERE   coin=? AND block=?;`;
        const [rows] = await conn.query(query, [coin, block]);
        return this.deepCopy(rows) as RtsSchedulerBlock[];
    }

    async getSchedulerBlockWithLock(conn: PoolConnection, txid: string): Promise<Array<RtsSchedulerBlock>> {
        const query = `
            SELECT  providerId,
                    coin,
                    block,
                    txid,
                    type,
                    done
            FROM    tSchedulerBlock
            WHERE   txid = ?;`;
        const [rows] = await conn.query(query, [txid]);
        return this.deepCopy(rows) as RtsSchedulerBlock[];
    }

    async doneSchedulerBlock(conn: PoolConnection, txid: string): Promise<void> {
        const query = `
            UPDATE  tSchedulerBlock
            SET     done = 1
            WHERE   txid = ?;`;
        const [rows] = await conn.query(query, [txid]);
        this.assertUpdate(rows);
    }
}
