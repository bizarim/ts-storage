import { IUpResult } from 'ts-common';
import { AbsDbExector } from './AbsDbExector';
/**
 *  수동 트랜잭션
 */
export declare class TRManual extends AbsDbExector {
    private isCommand;
    release(): void;
    command(): Promise<IUpResult>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
