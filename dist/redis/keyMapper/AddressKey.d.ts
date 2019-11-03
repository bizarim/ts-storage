import { IHashKeyMapper } from '../base/KeyMapper';
export declare enum eAddressField {
    memberId = "memberId",
    coin = "coin",
    address = "address"
}
export declare class RhoAddress {
    memberId: number | undefined;
    coin: string | undefined;
    address: string | undefined;
}
export declare class AddressKey implements IHashKeyMapper {
    /**
     * hash key 얻기
     * @param coin 코인
     * @param address 주소
     */
    getKey(coin: string, address: string): string;
    getField(field: eAddressField): string;
}
