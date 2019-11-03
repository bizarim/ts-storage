"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const IORedis = require("ioredis");
class RedisPubSub {
    constructor(logger, ip, port) {
        this.bInit = false;
        this.logger = logger;
        this.ip = ip;
        this.port = port;
    }
    initialize(func) {
        if (true === this.bInit)
            return;
        this.client = new IORedis({ port: this.port, host: this.ip });
        if (undefined !== func) {
            this.client.on('message', func);
        }
    }
    // setHandleMessage(func: handleMessage) {
    //     if (undefined === this.client) return;
    //     this.client.on('message', func);
    // }
    publish(topic, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (undefined === this.client) {
                if (undefined !== this.logger) {
                    this.logger.error('redis pubsub clinet undefined');
                }
                return;
            }
            const rt = yield this.client.publish(topic, message);
            if (undefined !== this.logger) {
                this.logger.info('redis publish topic: ' + topic + ' / msg: ' + message + ' / rt: ' + rt);
            }
        });
    }
    subscribe(topic) {
        if (undefined === this.client) {
            if (undefined !== this.logger) {
                this.logger.error('redis pubsub clinet undefined');
            }
            return;
        }
        this.client.subscribe(topic);
        if (undefined !== this.logger) {
            this.logger.info('redis subscribe topic: ' + topic);
        }
    }
}
exports.RedisPubSub = RedisPubSub;
//# sourceMappingURL=RedisPubSub.js.map