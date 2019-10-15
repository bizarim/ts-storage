import * as IORedis from 'ioredis';
import { ILogger } from 'ts-common';

export type handleMessage = (topic: string, message: string) => void;

export class RedisPubSub {
    protected client: IORedis.Redis | undefined;
    protected logger: ILogger | undefined;
    private ip: string;
    private port: number;
    private bInit: boolean = false;
    constructor(logger: ILogger | undefined, ip: string, port: number) {
        this.logger = logger;
        this.ip = ip;
        this.port = port;
    }
    initialize(func?: handleMessage) {
        if (true === this.bInit) return;
        this.client = new IORedis({ port: this.port, host: this.ip });
        if (undefined !== func) {
            this.client.on('message', func);
        }
    }

    // setHandleMessage(func: handleMessage) {
    //     if (undefined === this.client) return;
    //     this.client.on('message', func);
    // }

    async publish(topic: string, message: string): Promise<void> {
        if (undefined === this.client) {
            if (undefined !== this.logger) { this.logger.error('redis pubsub clinet undefined'); }
            return;
        }
        const rt = await this.client.publish(topic, message);
        if (undefined !== this.logger) {
            this.logger.info('redis publish topic: ' + topic + ' / msg: ' + message + ' / rt: ' + rt);
        }
    }

    subscribe(topic: string) {
        if (undefined === this.client) {
            if (undefined !== this.logger) { this.logger.error('redis pubsub clinet undefined'); }
            return;
        }
        this.client.subscribe(topic);
        if (undefined !== this.logger) {
            this.logger.info('redis subscribe topic: ' + topic);
        }
    }


}
