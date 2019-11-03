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
const ts_common_1 = require("ts-common");
const DbBehavior_1 = require("./DbBehavior");
const exception_1 = require("../exception");
class AbsDbExector {
    initialize(pool, logger) {
        this.err = ts_common_1.eErrorCode.Success;
        this.dbBehavior = new DbBehavior_1.DbBehavior(pool);
        this.logger = logger;
        return this;
    }
    release() {
        this.logger = undefined;
    }
    execute() {
        throw new Error('Method not implemented.');
    }
    onQuery(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    onResult(result) {
        // throw new Error('Method not implemented.')
        return result;
    }
    command() {
        throw new Error('Method not implemented.');
    }
    createErrOnEx(ex) {
        if (ex instanceof exception_1.DbException)
            return new ts_common_1.UrtError(ex.code);
        else
            return new ts_common_1.UrtError(ts_common_1.eErrorCode.DB_ERROR);
    }
    createErr() {
        return new ts_common_1.UrtError(ts_common_1.eErrorCode.DB_ERROR);
    }
    logEx(ex, msg) {
        if (undefined === this.logger) {
            console.log(msg);
            if (ex instanceof exception_1.DbException) {
                console.log(ex.code);
            }
            else {
                console.log(ex.message);
                console.log(ex.stack);
            }
            return;
        }
        this.logger.error(msg);
        if (ex instanceof exception_1.DbException) {
            this.logger.error('DbExector errcode: ' + ex.code);
        }
        else {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
    }
    loggingQueryError(ex) {
        if (undefined === this.logger) {
            if (ex instanceof exception_1.DbException) {
                console.log(ex.code);
            }
            else {
                console.log(ex.message);
                console.log(ex.stack);
            }
            return;
        }
        if (ex instanceof exception_1.DbException) {
            this.logger.error('DbExector errcode: ' + ex.code);
        }
        else {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
    }
}
exports.AbsDbExector = AbsDbExector;
//# sourceMappingURL=AbsDbExector.js.map