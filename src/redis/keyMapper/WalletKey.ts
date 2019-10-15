import { IHashKeyMapper } from '../base/KeyMapper';

export enum eWalletField {
    id = 'id',
    coin = 'coin',
    passphrase = 'passphrase',
}

export class RhoWallet {
    id: string | undefined;
    coin: string | undefined;
    passphrase: string | undefined;
}

export class WalletKey implements IHashKeyMapper {
    /**
     * hash key 얻기
     * @param id provider id
     * @param coin 코인
     */
    getKey(id: string, coin: string): string {
        return `wallet_${id}_${coin}`;
    }

    getField(field: eWalletField): string {
        return eWalletField[field];
    }
}