import { IKeyMapper } from '../base/KeyMapper';

export class TokenKey implements IKeyMapper {

    getKey(token: string): string {
        return `tokenAccess_${token}`;
    }
}