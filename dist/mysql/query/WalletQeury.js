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
const base_1 = require("../base");
class WalletQuery extends base_1.DbQuery {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    getWalletWithLock(conn, providerId, coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT	providerId,
                    coin,
                    status
            FROM 	tWallet
            WHERE 	providerId = ? AND coin = ? FOR UPDATE`;
            const [rows] = yield conn.query(query, [providerId, coin]);
            return this.deepCopy(rows);
        });
    }
    getPassPhrase(conn, providerId, coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT	providerId,
                    coin,
                    passphrase,
                    status
            FROM 	tWallet
            WHERE 	providerId = ? AND coin = ?`;
            const [rows] = yield conn.query(query, [providerId, coin]);
            return this.deepCopy(rows);
        });
    }
    addWallet(conn, providerId, coin, passphrase, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tWallet(providerId,coin,passphrase,status)
            VALUES(?,?,?,?);`;
            const [rows] = yield conn.query(query, [providerId, coin, passphrase, status]);
            this.assertInsert(rows);
            return { providerId: providerId, coin: coin, status: status };
        });
    }
    updateWallet(conn, id, coin, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE  tWallet
            SET     status = ?
            WHERE   providerId = ? AND coin = ?;`;
            const [rows] = yield conn.query(query, [status, id, coin]);
            this.assertUpdate(rows);
        });
    }
    //
    addMemeber(conn, providerId, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tMember(providerId,uuid)
            VALUES(?,?);`;
            const [rows] = yield conn.query(query, [providerId, uuid]);
            this.assertInsert(rows);
            const memberId = this.getLastInsertId(rows);
            return memberId;
        });
    }
    getMemeber(conn, providerId, uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  id,
                    providerId,
                    uuid
            FROM    tMember
            WHERE   providerId = ? AND uuid = ?;`;
            const [rows] = yield conn.query(query, [providerId, uuid]);
            return this.deepCopy(rows);
        });
    }
    //
    // addAddress
    addAddress(conn, memberId, coin, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tAddress(memberId,coin,address)
            VALUES(?,?,?);`;
            const [rows] = yield conn.query(query, [memberId, coin, address]);
            this.assertInsert(rows);
        });
    }
    getAddress(conn, memberId, coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  memberId,
                    coin,
                    address
            FROM    tAddress
            WHERE   memberId = ? AND coin = ?;`;
            const [rows] = yield conn.query(query, [memberId, coin]);
            return this.deepCopy(rows);
        });
    }
}
exports.WalletQuery = WalletQuery;
//# sourceMappingURL=WalletQeury.js.map