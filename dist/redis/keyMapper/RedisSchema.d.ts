import { ProviderKey } from './ProviderKey';
import { TokenKey } from './TokenKey';
import { WalletKey } from './WalletKey';
import { SchedulerKey } from './SchedulerKey';
import { AddressKey } from './AddressKey';
export declare class RedisSchema {
    protected static provider: ProviderKey;
    protected static token: TokenKey;
    protected static wallet: WalletKey;
    protected static scheduler: SchedulerKey;
    protected static address: AddressKey;
    /**
     * 서비스 제공자 관련 정보
     */
    static getProvider(): ProviderKey;
    /**
     * 서비스 제공자 토큰 정보
     */
    static getToken(): TokenKey;
    /**
     * 서비스 제공자 지갑 정보
     */
    static getWallet(): WalletKey;
    /**
     * 스케쥴러 리스트
     */
    static getScheduler(): SchedulerKey;
    /**
     * address
     */
    static getAddress(): AddressKey;
}
