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
class BalanceQuery extends base_1.DbQuery {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    // addBalance
    addBalance(conn, memberId, coin, balance, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tBalance(memberId,coin,balance,status)
            VALUES(?,?,?,?);`;
            const [rows] = yield conn.query(query, [memberId, coin, balance, status]);
            this.assertInsert(rows);
        });
    }
    getBalance(conn, memberId, coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  memberId,
                    coin,
                    balance,
                    status
            FROM    tBalance
            WHERE   memberId = ? AND coin = ?;`;
            const [rows] = yield conn.query(query, [memberId, coin]);
            return this.deepCopy(rows);
        });
    }
    getBalanceWithLock(conn, memberId, coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  memberId,
                    coin,
                    balance,
                    status
            FROM    tBalance
            WHERE   memberId = ? AND coin = ? FOR UPDATE;`;
            const [rows] = yield conn.query(query, [memberId, coin]);
            return this.deepCopy(rows);
        });
    }
    updateBalance(conn, memberId, coin, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE  tBalance
            SET     balance = ?
            WHERE   memberId = ? AND coin = ?;`;
            const [rows] = yield conn.query(query, [amount, memberId, coin]);
            this.assertUpdate(rows);
        });
    }
    updateBalanceWithStatus(conn, memberId, coin, amount, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE  tBalance
            SET     balance = ?,
                    status = ?
            WHERE   memberId = ? AND coin = ?;`;
            const [rows] = yield conn.query(query, [amount, status, memberId, coin]);
            this.assertUpdate(rows);
        });
    }
    updateBalanceStatus(conn, memberId, coin, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE  tBalance
            SET     status = ?
            WHERE   memberId = ? AND coin = ?;`;
            const [rows] = yield conn.query(query, [status, memberId, coin]);
            this.assertUpdate(rows);
        });
    }
    addBalanceStatement(conn, memberId, coin, amount, type, linkCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tBalanceStatement(memberId,coin,amount,type,linkCode)
            VALUES(?,?,?,?,?);`;
            const [rows] = yield conn.query(query, [memberId, coin, amount, type, linkCode]);
            this.assertInsert(rows);
        });
    }
    getSumBalanceStatement(conn, memberId, coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  COUNT(*) as sum
            FROM    tBalanceStatement
            WHERE   memberId = ? AND coin = ?;`;
            const [rows] = yield conn.query(query, [memberId, coin]);
            return this.deepCopy(rows);
        });
    }
    getBalanceStatement(conn, memberId, coin, page, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                    memberId,
                    coin,
                    amount,
                    type,
                    linkCode
            FROM    tBalanceStatement
            WHERE   memberId = ? AND coin = ?
            ORDER   BY regDate DESC
            LIMIT   ?, ?;`;
            const [rows] = yield conn.query(query, [memberId, coin, (page - 1) * offset, (page * offset)]);
            return this.deepCopy(rows);
        });
    }
    getBalanceStatementByPluse(conn, memberId, coin, page, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                    memberId,
                    coin,
                    amount,
                    type,
                    linkCode
            FROM    tBalanceStatement
            WHERE   memberId = ? AND coin = ? AND amount > 0
            ORDER BY regDate DESC
            LIMIT   ?, ?;`;
            const [rows] = yield conn.query(query, [memberId, coin, (page - 1) * offset, (page * offset)]);
            return this.deepCopy(rows);
        });
    }
    getBalanceStatementByMinus(conn, memberId, coin, page, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                    memberId,
                    coin,
                    amount,
                    type,
                    linkCode
            FROM    tBalanceStatement
            WHERE   memberId = ? AND coin = ? AND amount < 0
            ORDER BY regDate DESC
            LIMIT   ?, ?;`;
            const [rows] = yield conn.query(query, [memberId, coin, (page - 1) * offset, (page * offset)]);
            return this.deepCopy(rows);
        });
    }
}
exports.BalanceQuery = BalanceQuery;
//# sourceMappingURL=BalanceQuery.js.map