import { IHashKeyMapper } from '../base/KeyMapper';
export declare enum eProviderField {
    id = "id",
    tokenAccess = "tokenAccess",
    tokenRefresh = "tokenRefresh",
    nonce = "nonce"
}
export declare class RhoProvider {
    id: string | undefined;
    tokenAccess: string | undefined;
    tokenRefresh: string | undefined;
    nonce: number;
}
export declare class ProviderKey implements IHashKeyMapper {
    getKey(code: string): string;
    getField(field: eProviderField): string;
}
