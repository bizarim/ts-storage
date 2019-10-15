import { Redis } from '../../index';
import { eErrorCode, ILogger, UrtError, IUpResult } from 'ts-common';
import { IRedsExector } from './IRedsExector';
import { RedisClients } from './RedisClients';
import { RedisException } from './RedisException';

/**
 * user redis command
 */
export class AbsRedisCommand implements IRedsExector {
    logger?: ILogger;
    error: eErrorCode;
    clinets?: RedisClients;
    protected constructor() { }
    initialize(clinets: RedisClients, logger: ILogger): IRedsExector {
        this.error = eErrorCode.Success;
        this.clinets = clinets;
        this.logger = logger;
        return this;
    }
    release() {
        this.logger = undefined;
        this.clinets = undefined;
    }
    protected async onHandle(clinets: RedisClients): Promise<IUpResult> {
        throw new Error('Method not implemented.');
    }
    async execute(): Promise<IUpResult> {
        if (undefined === this.clinets) return this.createErrOnEx(eErrorCode.REDIS_ERROR);
        if (this.error != eErrorCode.Success) return this.createErrOnEx(this.error);
        try {
            return await this.onHandle(this.clinets); // command
        }
        catch (ex) {
            if (undefined !== this.logger) {
                this.logger.error(ex);                          // logging
            }

            return this.createErrOnEx(ex);             // error
        }
        finally {
            this.release();
        }
    }

    createErrOnEx(ex: any): UrtError {
        if (ex instanceof RedisException) return new UrtError(ex.code);
        else return new UrtError(eErrorCode.REDIS_EXCEPTION);
    }

    createErr(): UrtError {
        return new UrtError(eErrorCode.REDIS_EXCEPTION);
    }

    logEx(ex: any, msg: string): void {
        if (undefined === this.logger) {
            console.log(msg);
            if (ex instanceof RedisException) {
                console.log(ex.code);
            } else {
                console.log(ex.message);
                console.log(ex.stack);
            }
            return;
        }

        this.logger.error(msg);
        if (ex instanceof RedisException) {
            this.logger.error('IRedsExector errcode: ' + ex.code);
        } else {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
    }

    loggingQueryError(ex: any): void {
        if (undefined === this.logger) {
            if (ex instanceof RedisException) {
                console.log(ex.code);
            } else {
                console.log(ex.message);
                console.log(ex.stack);
            }
            return;
        }

        if (ex instanceof RedisException) {
            this.logger.error('IRedsExector errcode: ' + ex.code);
        } else {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
    }
}
