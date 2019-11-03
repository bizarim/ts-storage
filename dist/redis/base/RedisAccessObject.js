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
const RedisException_1 = require("./RedisException");
/**
 * Redis Access Object
 */
class RedisAccessObject {
    initialize(clinets, logger) {
        this.error = ts_common_1.eErrorCode.Success;
        this.clinets = clinets;
        this.logger = logger;
        return this;
    }
    release() {
        this.logger = undefined;
        this.clinets = undefined;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (undefined === this.clinets)
                return this.createErrOnEx(ts_common_1.eErrorCode.REDIS_ERROR);
            if (this.error != ts_common_1.eErrorCode.Success)
                return this.createErrOnEx(this.error);
            try {
                return yield this.onHandle(this.clinets); // command
            }
            catch (ex) {
                if (undefined !== this.logger) {
                    this.logger.error(ex); // logging
                }
                return this.createErrOnEx(ex); // error
            }
            finally {
                this.release();
            }
        });
    }
    createErrOnEx(ex) {
        if (ex instanceof RedisException_1.RedisException)
            return new ts_common_1.UrtError(ex.code);
        else
            return new ts_common_1.UrtError(ts_common_1.eErrorCode.REDIS_EXCEPTION);
    }
    createErr() {
        return new ts_common_1.UrtError(ts_common_1.eErrorCode.REDIS_EXCEPTION);
    }
    logEx(ex, msg) {
        if (undefined === this.logger) {
            console.log(msg);
            if (ex instanceof RedisException_1.RedisException) {
                console.log(ex.code);
            }
            else {
                console.log(ex.message);
                console.log(ex.stack);
            }
            return;
        }
        this.logger.error(msg);
        if (ex instanceof RedisException_1.RedisException) {
            this.logger.error('IRedsExector errcode: ' + ex.code);
        }
        else {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
    }
    loggingQueryError(ex) {
        if (undefined === this.logger) {
            if (ex instanceof RedisException_1.RedisException) {
                console.log(ex.code);
            }
            else {
                console.log(ex.message);
                console.log(ex.stack);
            }
            return;
        }
        if (ex instanceof RedisException_1.RedisException) {
            this.logger.error('IRedsExector errcode: ' + ex.code);
        }
        else {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
    }
}
exports.RedisAccessObject = RedisAccessObject;
//# sourceMappingURL=RedisAccessObject.js.map