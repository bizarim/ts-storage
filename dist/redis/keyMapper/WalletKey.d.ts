import { IHashKeyMapper } from '../base/KeyMapper';
export declare enum eWalletField {
    id = "id",
    coin = "coin",
    passphrase = "passphrase"
}
export declare class RhoWallet {
    id: string | undefined;
    coin: string | undefined;
    passphrase: string | undefined;
}
export declare class WalletKey implements IHashKeyMapper {
    /**
     * hash key 얻기
     * @param id provider id
     * @param coin 코인
     */
    getKey(id: string, coin: string): string;
    getField(field: eWalletField): string;
}
