"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_common_1 = require("ts-common");
class DbException extends Error {
    constructor(code) {
        super();
        this.code = ts_common_1.eErrorCode.Success;
        this.code = code;
        this.message = 'DbException';
    }
}
exports.DbException = DbException;
//# sourceMappingURL=DbException.js.map