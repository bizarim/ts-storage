"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var interface_1 = require("ts-common/dist/interface");
var enums_1 = require("ts-common/dist/enums");
var DbConn_1 = require("./DbConn");
/**
 * 쿼리 실행자 추상클래스
 */
var AbsDbExector = /** @class */ (function () {
    function AbsDbExector(pool) {
        this.dbConn = new DbConn_1.DbConn(pool);
        this.err = enums_1.eErrCode.Success;
    }
    AbsDbExector.prototype.release = function () {
        // if (undefined !== this.conn) {
        //   this.conn.release()
        //   this.conn = undefined
        // }
        // this.err = undefined
    };
    AbsDbExector.prototype.execute = function () {
        throw new Error('Method not implemented.');
    };
    AbsDbExector.prototype.onQuery = function (conn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('Method not implemented.');
            });
        });
    };
    AbsDbExector.prototype.onResult = function (result) {
        // throw new Error('Method not implemented.')
        return result;
    };
    AbsDbExector.prototype.command = function () {
        throw new Error('Method not implemented.');
    };
    AbsDbExector.prototype.createErrOnEx = function (ex) {
        var errcode = Object.values(enums_1.eErrCode).find(function (o) { return o === ex; });
        if (undefined === errcode)
            return new interface_1.UrtError(enums_1.eErrCode.DB_ERROR);
        else
            return new interface_1.UrtError(errcode);
    };
    AbsDbExector.prototype.createErr = function () {
        return new interface_1.UrtError(enums_1.eErrCode.DB_ERROR);
    };
    AbsDbExector.prototype.logEx = function (ex, msg) {
        if (undefined === this.logger) {
            console.log('logger undefined');
            console.log(msg);
            console.log(ex);
            return;
        }
        this.logger.error(msg);
        if (undefined !== ex.message) {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
        else {
            this.logger.error('errcode: ' + ex);
        }
    };
    AbsDbExector.prototype.loggingQueryError = function (ex) {
        if (undefined === this.logger) {
            console.log('logger undefined');
            console.log(ex);
            return;
        }
        if (undefined !== ex.message) {
            this.logger.error(ex.message);
            this.logger.error(ex.stack);
        }
    };
    return AbsDbExector;
}());
exports.AbsDbExector = AbsDbExector;
