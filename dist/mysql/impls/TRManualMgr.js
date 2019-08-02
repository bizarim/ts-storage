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
var enums_1 = require("ts-common/dist/enums");
var RsUpManual = /** @class */ (function () {
    function RsUpManual(err) {
        if (err === void 0) { err = enums_1.eErrCode.Success; }
        this.err = err;
    }
    RsUpManual.prototype.toResponse = function () {
        return undefined;
    };
    return RsUpManual;
}());
exports.RsUpManual = RsUpManual;
/**
 * 수동 트랜잭션 처리 관리자
 */
var TRManualMgr = /** @class */ (function () {
    function TRManualMgr() {
        this.list = [];
        this.completes = [];
        this.fails = [];
    }
    TRManualMgr.prototype.release = function () {
        delete this.list;
        delete this.list;
        delete this.completes;
    };
    TRManualMgr.prototype.addProcedure = function (trmanual) {
        // if (undefined === this.list) {
        //   this.list = []
        // }
        this.list.push(trmanual);
    };
    TRManualMgr.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, err, cnt, i, ptu, rt, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = new RsUpManual();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, 11, 12]);
                        err = enums_1.eErrCode.Success;
                        cnt = this.list.length;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < cnt)) return [3 /*break*/, 5];
                        ptu = this.list.shift();
                        return [4 /*yield*/, ptu.command()];
                    case 3:
                        rt = _a.sent();
                        if (enums_1.eErrCode.Success !== rt.err) {
                            err = rt.err;
                            result.err = rt.err;
                            this.fails.push(ptu);
                            return [3 /*break*/, 5];
                        }
                        this.completes.push(ptu);
                        result.list.push(rt);
                        _a.label = 4;
                    case 4:
                        ++i;
                        return [3 /*break*/, 2];
                    case 5:
                        if (!(enums_1.eErrCode.Success !== err)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.rollback()];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.commit()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        ex_1 = _a.sent();
                        // _logger.error(ex)
                        return [2 /*return*/, new RsUpManual(enums_1.eErrCode.DB_ERROR)];
                    case 11:
                        this.release();
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, result];
                }
            });
        });
    };
    TRManualMgr.prototype.rollback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ccnt, i, ptu, lcnt, i, ptu, fcnt, i, ptu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ccnt = this.completes.length;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < ccnt)) return [3 /*break*/, 4];
                        ptu = this.completes.shift();
                        return [4 /*yield*/, ptu.rollback()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4:
                        lcnt = this.list.length;
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < lcnt)) return [3 /*break*/, 8];
                        ptu = this.list.shift();
                        return [4 /*yield*/, ptu.rollback()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        ++i;
                        return [3 /*break*/, 5];
                    case 8:
                        fcnt = this.fails.length;
                        i = 0;
                        _a.label = 9;
                    case 9:
                        if (!(i < fcnt)) return [3 /*break*/, 12];
                        ptu = this.fails.shift();
                        return [4 /*yield*/, ptu.rollback()];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11:
                        ++i;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    TRManualMgr.prototype.commit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ccnt, i, ptu, lcnt, i, ptu;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ccnt = this.completes.length;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < ccnt)) return [3 /*break*/, 4];
                        ptu = this.completes.shift();
                        return [4 /*yield*/, ptu.commit()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4:
                        lcnt = this.list.length;
                        i = 0;
                        _a.label = 5;
                    case 5:
                        if (!(i < lcnt)) return [3 /*break*/, 8];
                        ptu = this.list.shift();
                        return [4 /*yield*/, ptu.commit()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        ++i;
                        return [3 /*break*/, 5];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return TRManualMgr;
}());
exports.TRManualMgr = TRManualMgr;
