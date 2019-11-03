"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class ProviderQuery extends index_1.DbQuery {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    /**
     * 등록 되어 서비스 제공자 인지 확인
     * @param conn db connection
     * @param code provider code
     * @param key provider key
     */
    getProviderDefine(conn, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  code,
                    providerKey
            FROM tProviderDefine
            WHERE code = ?;`;
            const [rows] = yield conn.query(query, [code]);
            return this.deepCopy(rows);
            // EXPLAIN
            // "1"	"SIMPLE"	"tProviderDefine"   "const" 	"PRIMARY"	"PRIMARY"	"26"	"const"	"1"	"100.00"
        });
    }
    getProvier(conn, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                    code,
                    id,
                    regDate
            FROM    tProvider
            WHERE   code = ?;`;
            const [rows] = yield conn.query(query, [code]);
            return this.deepCopy(rows);
        });
    }
    /**
     * 서비스 제공자 등록
     * @param conn db connection
     * @param code provider code
     * @param id provoider id
     */
    addProvier(conn, code, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tProvider(code,id)
            VALUES(?,?);`;
            const [rows] = yield conn.query(query, [code, id]);
            this.assertInsert(rows);
            return { code: code, id: id, regDate: '' };
        });
    }
    getProvierJoin(conn, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                    pd.providerKey,
                    pv.id AS id,
                    pv.code
            FROM 	tProvider AS pv
            JOIN 	tProviderDefine AS pd
            ON 		pv.code = pd.code
            WHERE 	pd.code = ?;`;
            const [rows] = yield conn.query(query, [code]);
            return this.deepCopy(rows);
            // EXPLAIN
            // "1"	"SIMPLE"	"pv"    "const"	"PRIMARY"	                                "PRIMARY"	"26"	"const"	"1"	"100.00"
            // "1"	"SIMPLE"	"pd"    "const"	"PRIMARY,IX_tProviderDefine_providerKey"	"PRIMARY"	"26"	"const"	"1"	"100.00"
        });
    }
    /**
     * 서비스 제공자 계정 등록
     * @param conn db connection
     * @param id 제공자 아이디
     * @param uuid 제공자 고유번호
     * @param type 타입
     * @param alias 별칭
     */
    addProvierAccount(conn, id, uuid, type, alias = 'NULL') {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tProviderAccount(id,uuid,type,alias)
            VALUES(?,?,?,?);`;
            const [rows] = yield conn.query(query, [id, uuid, type, alias]);
            this.assertInsert(rows);
            const rt = { id: id, uuid: uuid, type: type, alias: alias, regDate: '' };
            return rt;
        });
    }
    getProvierAccount(conn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  id,
                    uuid,
                    type,
                    alias
            FROM    tProviderAccount
            WHERE   id = ?;`;
            const [rows] = yield conn.query(query, [id]);
            const list = this.deepCopy(rows);
            return list;
        });
    }
    /**
     * 서비스 제공자 access token 등록
     * @param conn db connection
     * @param id 제공자 아이디
     * @param token 발급된 access token
     * @param expireDate access token 만료 기간
     */
    addTokenAccess(conn, id, token, nonce, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tTokenAccess(providerId,token,nonce,expireDate)
            VALUES(?,?,?,?);`;
            const [rows] = yield conn.query(query, [id, token, nonce, expireDate]);
            this.assertInsert(rows);
            // const rt: RtsTokenAccess = { id: id, token: token, expireDate: expireDate };
            // return rt;
        });
    }
    // getProviderId
    updateTokenAccess(conn, id, token, nonce, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE  tTokenAccess
            SET     token = ?,
                    nonce = ?,
                    expireDate = ?
            WHERE   providerId = ?;`;
            const [rows] = yield conn.query(query, [token, nonce, expireDate, id]);
            this.assertUpdate(rows);
        });
    }
    updateTokenAccessToNonce(conn, providerId, nonce) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE  tTokenAccess
            SET     nonce = ?
            WHERE   providerId = ?;`;
            const [rows] = yield conn.query(query, [nonce, providerId]);
            this.assertUpdateWithOutChange(rows);
        });
    }
    // checkTokenAccess
    getTokenAccessByCode(conn, code) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const [rows] = yield conn.query(query, [code]);
            return this.deepCopy(rows);
        });
    }
    getTokenAccessById(conn, memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  ta.token,
                    ta.nonce,
                    ta.expireDate,
                    mb.id AS providerId
            FROM 	tMember AS mb
            JOIN 	tTokenAccess AS ta
            ON 		mb.providerId = ta.providerId
            WHERE 	mb.id = ?;`;
            const [rows] = yield conn.query(query, [memberId]);
            return this.deepCopy(rows);
            // "1"	"SIMPLE"	"mb"	\N	"const"	"PRIMARY,IX_tMember_providerId_uuid"	"PRIMARY"	"8"	"const"	"1"	"100.00"	\N
            // "1"	"SIMPLE"	"ta"	\N	"const"	"PRIMARY"	"PRIMARY"	"98"	"const"	"1"	"100.00"	\N
        });
    }
    /**
     * 서비스 제공자 refresh token 등록
     * @param conn db connection
     * @param id 제공자 아이디
     * @param token 발급된 refresh token
     */
    addTokenRefresh(conn, id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tTokenRefresh(providerId,token)
            VALUES(?,?);`;
            const [rows] = yield conn.query(query, [id, token]);
            this.assertInsert(rows);
            // const rt: RtsTokenAccess = { id: id, token: token };
            // return rt;
        });
    }
    // getProviderId
    updateTokenRefresh(conn, id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE  tTokenRefresh
            SET     token = ?,
                    cnt = cnt + 1
            WHERE   providerId = ?;`;
            const [rows] = yield conn.query(query, [token, id]);
            this.assertUpdate(rows);
        });
    }
    // getTokenRefresh
    getTokenRefresh(conn, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT	tr.providerId AS id,
                    tr.token
            FROM 	tTokenRefresh AS tr
            JOIN 	tProvider AS pv
            ON 		tr.providerId = pv.id
            WHERE 	pv.code = ?`;
            const [rows] = yield conn.query(query, [code]);
            return this.deepCopy(rows);
            // EXPLAIN
            // "1"	"SIMPLE"	"pv"    "const"	"PRIMARY,IX_tProvider_id"	"PRIMARY"	"26"	"const"	"1"	"100.00"
            // "1"	"SIMPLE"	"tr"    "const"	"PRIMARY"	                "PRIMARY"	"98"	"const"	"1"	"100.00"
        });
    }
}
exports.ProviderQuery = ProviderQuery;
//# sourceMappingURL=ProviderQuery.js.map