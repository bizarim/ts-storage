import { IHashKeyMapper } from '../base/KeyMapper';

export enum eProviderField {
    id = 'id',
    tokenAccess = 'tokenAccess',
    tokenRefresh = 'tokenRefresh',
    nonce = 'nonce',
}

export class RhoProvider {
    id: string | undefined;
    tokenAccess: string | undefined;
    tokenRefresh: string | undefined;
    nonce: number;
}

export class ProviderKey implements IHashKeyMapper {

    getKey(code: string): string {
        return `provider_${code}`;
    }
    getField(field: eProviderField): string {
        return eProviderField[field];
    }
}