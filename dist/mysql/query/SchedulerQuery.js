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
class SchedulerQuery extends base_1.DbQuery {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    registerScheduler(conn, providerId, coin, block, txid, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            INSERT INTO tSchedulerBlock(providerId,coin,block,txid,type,done)
            VALUES(?,?,?,?,?,?);`;
            const [rows] = yield conn.query(query, [providerId, coin, block, txid, type, 0]);
            this.assertInsert(rows);
        });
    }
    getSchedulerBlocks(conn, coin, block) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  providerId,
                    coin,
                    block,
                    txid,
                    type,
                    done
            FROM    tSchedulerBlock
            WHERE   coin=? AND block=?;`;
            const [rows] = yield conn.query(query, [coin, block]);
            return this.deepCopy(rows);
        });
    }
    getSchedulerBlockWithLock(conn, txid) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT  providerId,
                    coin,
                    block,
                    txid,
                    type,
                    done
            FROM    tSchedulerBlock
            WHERE   txid = ?;`;
            const [rows] = yield conn.query(query, [txid]);
            return this.deepCopy(rows);
        });
    }
    doneSchedulerBlock(conn, txid) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            UPDATE  tSchedulerBlock
            SET     done = 1
            WHERE   txid = ?;`;
            const [rows] = yield conn.query(query, [txid]);
            this.assertUpdate(rows);
        });
    }
}
exports.SchedulerQuery = SchedulerQuery;
//# sourceMappingURL=SchedulerQuery.js.map