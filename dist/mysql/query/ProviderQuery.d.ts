import { PoolConnection } from '../index';
import { ILogger } from 'ts-common';
import { DbQuery } from '../index';
import { RtsProviderDefine, RtsProvider, RtsProviderAccount, RtsTokenAccess, RtsTokenRefresh, RtsJoinProvider } from '../resultset';
export declare class ProviderQuery extends DbQuery {
    logger?: ILogger;
    constructor(logger?: ILogger);
    /**
     * 등록 되어 서비스 제공자 인지 확인
     * @param conn db connection
     * @param code provider code
     * @param key provider key
     */
    getProviderDefine(conn: PoolConnection, code: string): Promise<Array<RtsProviderDefine>>;
    getProvier(conn: PoolConnection, code: string): Promise<Array<RtsProvider>>;
    /**
     * 서비스 제공자 등록
     * @param conn db connection
     * @param code provider code
     * @param id provoider id
     */
    addProvier(conn: PoolConnection, code: string, id: string): Promise<RtsProvider>;
    getProvierJoin(conn: PoolConnection, code: string): Promise<Array<RtsJoinProvider>>;
    /**
     * 서비스 제공자 계정 등록
     * @param conn db connection
     * @param id 제공자 아이디
     * @param uuid 제공자 고유번호
     * @param type 타입
     * @param alias 별칭
     */
    addProvierAccount(conn: PoolConnection, id: string, uuid: string, type: string, alias?: string): Promise<RtsProviderAccount>;
    getProvierAccount(conn: PoolConnection, id: string): Promise<Array<RtsProviderAccount>>;
    /**
     * 서비스 제공자 access token 등록
     * @param conn db connection
     * @param id 제공자 아이디
     * @param token 발급된 access token
     * @param expireDate access token 만료 기간
     */
    addTokenAccess(conn: PoolConnection, id: string, token: string, nonce: number, expireDate: string): Promise<void>;
    updateTokenAccess(conn: PoolConnection, id: string, token: string, nonce: number, expireDate: string): Promise<void>;
    updateTokenAccessToNonce(conn: PoolConnection, providerId: string, nonce: number): Promise<void>;
    getTokenAccessByCode(conn: PoolConnection, code: string): Promise<Array<RtsTokenAccess>>;
    getTokenAccessById(conn: PoolConnection, memberId: number): Promise<Array<RtsTokenAccess>>;
    /**
     * 서비스 제공자 refresh token 등록
     * @param conn db connection
     * @param id 제공자 아이디
     * @param token 발급된 refresh token
     */
    addTokenRefresh(conn: PoolConnection, id: string, token: string): Promise<void>;
    updateTokenRefresh(conn: PoolConnection, id: string, token: string): Promise<void>;
    getTokenRefresh(conn: PoolConnection, code: string): Promise<Array<RtsTokenRefresh>>;
}
