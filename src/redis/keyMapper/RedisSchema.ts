import { ProviderKey } from './ProviderKey';
import { TokenKey } from './TokenKey';
import { WalletKey } from './WalletKey';
import { SchedulerKey } from './SchedulerKey';
import { AddressKey } from './AddressKey';

export class RedisSchema {
    protected static provider = new ProviderKey();
    protected static token = new TokenKey();
    protected static wallet = new WalletKey();
    protected static scheduler = new SchedulerKey();
    protected static address = new AddressKey();
    /**
     * 서비스 제공자 관련 정보
     */
    public static getProvider() { return this.provider; }
    /**
     * 서비스 제공자 토큰 정보
     */
    public static getToken() { return this.token; }

    /**
     * 서비스 제공자 지갑 정보
     */
    public static getWallet() { return this.wallet; }

    /**
     * 스케쥴러 리스트
     */
    public static getScheduler() { return this.scheduler; }


    /**
     * address
     */
    public static getAddress() { return this.address; }
}