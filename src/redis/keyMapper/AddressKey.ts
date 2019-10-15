import { IHashKeyMapper } from '../base/KeyMapper';

export enum eAddressField {
    memberId = 'memberId',
    coin = 'coin',
    address = 'address',
}

export class RhoAddress {
    memberId: number | undefined;
    coin: string | undefined;
    address: string | undefined;
}

export class AddressKey implements IHashKeyMapper {
    /**
     * hash key 얻기
     * @param coin 코인
     * @param address 주소
     */
    getKey(coin: string, address: string): string {
        return `address_${coin}_${address}`;
    }

    getField(field: eAddressField): string {
        return eAddressField[field];
    }
}