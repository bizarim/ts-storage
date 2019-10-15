"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProviderKey_1 = require("./ProviderKey");
const TokenKey_1 = require("./TokenKey");
const WalletKey_1 = require("./WalletKey");
const SchedulerKey_1 = require("./SchedulerKey");
const AddressKey_1 = require("./AddressKey");
class RedisSchema {
    /**
     * 서비스 제공자 관련 정보
     */
    static getProvider() { return this.provider; }
    /**
     * 서비스 제공자 토큰 정보
     */
    static getToken() { return this.token; }
    /**
     * 서비스 제공자 지갑 정보
     */
    static getWallet() { return this.wallet; }
    /**
     * 스케쥴러 리스트
     */
    static getScheduler() { return this.scheduler; }
    /**
     * address
     */
    static getAddress() { return this.address; }
}
exports.RedisSchema = RedisSchema;
RedisSchema.provider = new ProviderKey_1.ProviderKey();
RedisSchema.token = new TokenKey_1.TokenKey();
RedisSchema.wallet = new WalletKey_1.WalletKey();
RedisSchema.scheduler = new SchedulerKey_1.SchedulerKey();
RedisSchema.address = new AddressKey_1.AddressKey();
//# sourceMappingURL=RedisSchema.js.map