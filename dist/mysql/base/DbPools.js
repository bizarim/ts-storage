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
class DbPools {
    constructor() {
        this.pools = {};
    }
    initialize(config) {
        return __awaiter(this, void 0, void 0, function* () {
            Object.keys(config.dbs).forEach(element => {
                this.pools[element] = index_1.createPool(config.dbs[element]);
            });
        });
    }
    getPool(db) {
        return this.pools[`${db}`];
    }
}
exports.DbPools = DbPools;
//# sourceMappingURL=DbPools.js.map