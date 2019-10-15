import { PoolConnection } from '../index';
import { ILogger } from 'ts-common';
import { DbQuery } from '../index';
import { RtsProviderDefine, RtsProvider, RtsProviderAccount, RtsTokenAccess, RtsTokenRefresh, RtsJoinProvider } from '../resultset';

export class ProviderQuery extends DbQuery {
    public logger?: ILogger;
    constructor(logger?: ILogger) {
        super();
        this.logger = logger;
    }

    /**
     * 등록 되어 서비스 제공자 인지 확인
     * @param conn db connection
     * @param code provider code
     * @param key provider key
     */
    async getProviderDefine(conn: PoolConnection, code: string): Promise<Array<RtsProviderDefine>> {
        const query = `
            SELECT  code,
                    providerKey
            FROM tProviderDefine
            WHERE code = ?;`;
        const [rows] = await conn.query(query, [code]);
        return this.deepCopy(rows) as RtsProviderDefine[];
        // EXPLAIN
        // "1"	"SIMPLE"	"tProviderDefine"   "const" 	"PRIMARY"	"PRIMARY"	"26"	"const"	"1"	"100.00"
    }

    async getProvier(conn: PoolConnection, code: string): Promise<Array<RtsProvider>> {
        const query = `
            SELECT
                    code,
                    id,
                    regDate
            FROM    tProvider
            WHERE   code = ?;`;
        const [rows] = await conn.query(query, [code]);
        return this.deepCopy(rows) as Array<RtsProvider>;
    }

    /**
     * 서비스 제공자 등록
     * @param conn db connection
     * @param code provider code
     * @param id provoider id
     */
    async addProvier(conn: PoolConnection, code: string, id: string): Promise<RtsProvider> {
        const query = `
            INSERT INTO tProvider(code,id)
            VALUES(?,?);`;
        const [rows] = await conn.query(query, [code, id]);
        this.assertInsert(rows);
        return { code: code, id: id, regDate: '' } as RtsProvider;
    }

    async getProvierJoin(conn: PoolConnection, code: string): Promise<Array<RtsJoinProvider>> {
        const query = `
            SELECT
                    pd.providerKey,
                    pv.id AS id,
                    pv.code
            FROM 	tProvider AS pv
            JOIN 	tProviderDefine AS pd
            ON 		pv.code = pd.code
            WHERE 	pd.code = ?;`;
        const [rows] = await conn.query(query, [code]);
        return this.deepCopy(rows) as Array<RtsJoinProvider>;
        // EXPLAIN
        // "1"	"SIMPLE"	"pv"    "const"	"PRIMARY"	                                "PRIMARY"	"26"	"const"	"1"	"100.00"
        // "1"	"SIMPLE"	"pd"    "const"	"PRIMARY,IX_tProviderDefine_providerKey"	"PRIMARY"	"26"	"const"	"1"	"100.00"
    }


    /**
     * 서비스 제공자 계정 등록
     * @param conn db connection
     * @param id 제공자 아이디
     * @param uuid 제공자 고유번호
     * @param type 타입
     * @param alias 별칭
     */
    async addProvierAccount(conn: PoolConnection, id: string, uuid: string, type: string, alias: string = 'NULL'): Promise<RtsProviderAccount> {
        const query = `
            INSERT INTO tProviderAccount(id,uuid,type,alias)
            VALUES(?,?,?,?);`;
        const [rows] = await conn.query(query, [id, uuid, type, alias]);
        this.assertInsert(rows);

        const rt: RtsProviderAccount = { id: id, uuid: uuid, type: type, alias: alias, regDate: '' };
        return rt;
    }

    async getProvierAccount(conn: PoolConnection, id: string): Promise<Array<RtsProviderAccount>> {
        const query = `
            SELECT  id,
                    uuid,
                    type,
                    alias
            FROM    tProviderAccount
            WHERE   id = ?;`;
        const [rows] = await conn.query(query, [id]);
        const list: Array<RtsProviderAccount> = this.deepCopy(rows);
        return list;
    }


    /**
     * 서비스 제공자 access token 등록
     * @param conn db connection
     * @param id 제공자 아이디
     * @param token 발급된 access token
     * @param expireDate access token 만료 기간
     */
    async addTokenAccess(conn: PoolConnection, id: string, token: string, nonce: number, expireDate: string): Promise<void> {
        const query = `
            INSERT INTO tTokenAccess(providerId,token,nonce,expireDate)
            VALUES(?,?,?,?);`;
        const [rows] = await conn.query(query, [id, token, nonce, expireDate]);
        this.assertInsert(rows);
        // const rt: RtsTokenAccess = { id: id, token: token, expireDate: expireDate };
        // return rt;
    }

    // getProviderId
    async updateTokenAccess(conn: PoolConnection, id: string, token: string, nonce: number, expireDate: string): Promise<void> {
        const query = `
            UPDATE  tTokenAccess
            SET     token = ?,
                    nonce = ?,
                    expireDate = ?
            WHERE   providerId = ?;`;
        const [rows] = await conn.query(query, [token, nonce, expireDate, id]);
        this.assertUpdate(rows);
    }

    async updateTokenAccessToNonce(conn: PoolConnection, providerId: string, nonce: number): Promise<void> {
        const query = `
            UPDATE  tTokenAccess
            SET     nonce = ?
            WHERE   providerId = ?;`;
        const [rows] = await conn.query(query, [nonce, providerId]);
        this.assertUpdateWithOutChange(rows);
    }

    // checkTokenAccess
    async getTokenAccessByCode(conn: PoolConnection, code: string): Promise<Array<RtsTokenAccess>> {
        const query = `
            SELECT
                    ta.token,
                    ta.nonce,
                    ta.expireDate,
                    pv.id AS providerId,
                    pv.CODE
            FROM 	tProvider AS pv
            JOIN 	tTokenAccess AS ta
            ON 		pv.id = ta.providerId
            WHERE 	pv.code = ?;`;
        const [rows] = await conn.query(query, [code]);
        return this.deepCopy(rows) as Array<RtsTokenAccess>;
    }

    async getTokenAccessById(conn: PoolConnection, memberId: number): Promise<Array<RtsTokenAccess>> {
        const query = `
            SELECT  ta.token,
                    ta.nonce,
                    ta.expireDate,
                    mb.id AS providerId
            FROM 	tMember AS mb
            JOIN 	tTokenAccess AS ta
            ON 		mb.providerId = ta.providerId
            WHERE 	mb.id = ?;`;
        const [rows] = await conn.query(query, [memberId]);
        return this.deepCopy(rows) as Array<RtsTokenAccess>;
        // "1"	"SIMPLE"	"mb"	\N	"const"	"PRIMARY,IX_tMember_providerId_uuid"	"PRIMARY"	"8"	"const"	"1"	"100.00"	\N
        // "1"	"SIMPLE"	"ta"	\N	"const"	"PRIMARY"	"PRIMARY"	"98"	"const"	"1"	"100.00"	\N
    }

    /**
     * 서비스 제공자 refresh token 등록
     * @param conn db connection
     * @param id 제공자 아이디
     * @param token 발급된 refresh token
     */
    async addTokenRefresh(conn: PoolConnection, id: string, token: string): Promise<void> {
        const query = `
            INSERT INTO tTokenRefresh(providerId,token)
            VALUES(?,?);`;
        const [rows] = await conn.query(query, [id, token]);
        this.assertInsert(rows);
        // const rt: RtsTokenAccess = { id: id, token: token };
        // return rt;
    }

    // getProviderId
    async updateTokenRefresh(conn: PoolConnection, id: string, token: string): Promise<void> {
        const query = `
            UPDATE  tTokenRefresh
            SET     token = ?,
                    cnt = cnt + 1
            WHERE   providerId = ?;`;
        const [rows] = await conn.query(query, [token, id]);
        this.assertUpdate(rows);
    }

    // getTokenRefresh
    async getTokenRefresh(conn: PoolConnection, code: string): Promise<Array<RtsTokenRefresh>> {
        const query = `
            SELECT	tr.providerId AS id,
                    tr.token
            FROM 	tTokenRefresh AS tr
            JOIN 	tProvider AS pv
            ON 		tr.providerId = pv.id
            WHERE 	pv.code = ?`;
        const [rows] = await conn.query(query, [code]);
        return this.deepCopy(rows) as Array<RtsTokenRefresh>;
        // EXPLAIN
        // "1"	"SIMPLE"	"pv"    "const"	"PRIMARY,IX_tProvider_id"	"PRIMARY"	"26"	"const"	"1"	"100.00"
        // "1"	"SIMPLE"	"tr"    "const"	"PRIMARY"	                "PRIMARY"	"98"	"const"	"1"	"100.00"

    }

}