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
class LedgerQuery extends base_1.DbQuery {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    getSumOfLedgerUnspentList(conn, providerId, coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT   Round(SUM(amount),?) AS sum
            FROM 	tLedgerUnspentList
            WHERE 	coin = ? AND providerId = ?;`;
            const [rows] = yield conn.query(query, [base_1.Digit.get(coin), coin, providerId]);
            return this.deepCopy(rows);
        });
    }
    addLedgerUnspentList(conn, param) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tLedgerUnspentList(coin,address,providerId,txid,amount)
            VALUES(?,?,?,?,?);`;
            const [rows] = yield conn.query(query, [param.coin, param.address, param.providerId, param.txid, param.amount]);
            this.assertInsert(rows);
        });
    }
    addLedgerUnspentListBySend(conn, coin, address, providerId, txid, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tLedgerUnspentList(coin,address,providerId,txid,amount)
            VALUES(?,?,?,?,?);`;
            const [rows] = yield conn.query(query, [coin, address, providerId, txid, amount]);
            this.assertInsert(rows);
        });
    }
    updateLedgerUnspentList(conn, txid) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE tLedgerUnspentList
            SET amount = 0
            WHERE txid = ?;`;
            const [rows] = yield conn.query(query, [txid]);
            // todo
            // this.assertUpdateWithOutChange(rows);
        });
    }
    addLedgerStatementToSend(conn, coin, params, rpcCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tLedgerStatement(memberId,coin,type,rpcCode,toFromAddress,amount,commission)
            VALUES(?,?,?,?,?,?,?);`;
            const [rows] = yield conn.query(query, [params.memberId, coin, 'send', rpcCode, params.address, params.amount, params.commission]);
            this.assertInsert(rows);
        });
    }
    addLedgerStatementToRecv(conn, param, rpcCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tLedgerStatement(memberId,coin,type,rpcCode,toFromAddress,amount,commission)
            VALUES(?,?,?,?,?,?,?);`;
            const [rows] = yield conn.query(query, [param.memberId, param.coin, 'recv', rpcCode, '', param.amount, 0]);
            this.assertInsert(rows);
        });
    }
    getSumLedgerStatement(conn, memberId, coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  COUNT(*) as sum
            FROM    tLedgerStatement
            WHERE   memberId = ? AND coin = ?;`;
            const [rows] = yield conn.query(query, [memberId, coin]);
            return this.deepCopy(rows);
        });
    }
    getLedgerStatement(conn, memberId, coin, page, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                    memberId,
                    coin,
                    type,
                    rpcCode,
                    toFromAddress,
                    amount,
                    commission
            FROM    tLedgerStatement
            WHERE   memberId = ? AND coin = ?
            ORDER BY regDate DESC
            LIMIT   ?, ?;`;
            const [rows] = yield conn.query(query, [memberId, coin, (page - 1) * offset, (page * offset)]);
            return this.deepCopy(rows);
        });
    }
    addLedgerTransaction(conn, rpcCode, providerId, coin, txId, fee, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tLedgerTransaction(rpcCode,providerId,coin,txId,fee,status)
            VALUES(?,?,?,?,?,?);`;
            const [rows] = yield conn.query(query, [rpcCode, providerId, coin, txId, fee, status]);
            this.assertInsert(rows);
        });
    }
    updateLedgerTransaction(conn, coin, txId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE  tLedgerTransaction
            SET     status = ?
            WHERE   coin = ? AND txId = ?;`;
            const [rows] = yield conn.query(query, [status, coin, txId]);
            this.assertInsert(rows);
        });
    }
    getLedgerTransaction(conn, coin, txId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                    rpcCode,
                    providerId,
                    coin,
                    txId,
                    fee,
                    status
            FROM    tLedgerTransaction
            WHERE   coin = ? AND txId = ?;`;
            const [rows] = yield conn.query(query, [coin, txId]);
            return this.deepCopy(rows);
        });
    }
    getLedgerTransactionsWithList(conn, coin, txList) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                    rpcCode,
                    providerId,
                    coin,
                    txId,
                    fee,
                    status
            FROM    tLedgerTransaction
            WHERE   coin = ? AND txId IN(?);`;
            const [rows] = yield conn.query(query, [coin, txList]);
            return this.deepCopy(rows);
        });
    }
    getLedgerTransactionWithJoin(conn, coin, txId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT
                    ls.memberId,
                    ls.type,
                    ls.toFromAddress
            FROM 	tLedgerStatement AS ls
            JOIN 	tLedgerTransaction AS lt
            ON 		ls.rpcCode = lt.rpcCode
            WHERE 	lt.coin = ? AND lt.txId = ?;`;
            const [rows] = yield conn.query(query, [coin, txId]);
            return this.deepCopy(rows);
        });
    }
}
exports.LedgerQuery = LedgerQuery;
//# sourceMappingURL=LedgerQuery.js.map