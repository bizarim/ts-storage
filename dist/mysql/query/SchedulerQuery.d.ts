import { ILogger } from 'ts-common';
import { DbQuery } from '../base';
import { PoolConnection, RtsSchedulerBlock } from '..';
export declare class SchedulerQuery extends DbQuery {
    logger?: ILogger;
    constructor(logger?: ILogger);
    registerScheduler(conn: PoolConnection, providerId: string, coin: string, block: string, txid: string, type: string): Promise<void>;
    getSchedulerBlocks(conn: PoolConnection, coin: string, block: string): Promise<Array<RtsSchedulerBlock>>;
    getSchedulerBlockWithLock(conn: PoolConnection, txid: string): Promise<Array<RtsSchedulerBlock>>;
    doneSchedulerBlock(conn: PoolConnection, txid: string): Promise<void>;
}
