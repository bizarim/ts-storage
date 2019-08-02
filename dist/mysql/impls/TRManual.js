"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var interface_1 = require("ts-common/dist/interface");
var AbsDbExector_1 = require("./AbsDbExector");
/**
 *  수동 트랜잭션
 */
var TRManual = /** @class */ (function (_super) {
    __extends(TRManual, _super);
    function TRManual(pool) {
        var _this = _super.call(this, pool) || this;
        _this.isCommand = false;
        return _this;
    }
    TRManual.prototype.release = function () {
        this.isCommand = false;
        _super.prototype.release.call(this);
    };
    // 커맨드 처리
    TRManual.prototype.command = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_1, result, ex_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (undefined === this.dbConn)
                            return [2 /*return*/, new interface_1.UrtError(enums_1.eErrCode.DB_ERROR_CONN)
                                // 1. check init
                            ];
                        // 1. check init
                        if (this.err !== enums_1.eErrCode.Success) {
                            return [2 /*return*/, this.createErrOnEx(this.err)];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.dbConn.open()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        this.logEx(ex_1, 'conn open error');
                        return [2 /*return*/, this.createErrOnEx(ex_1)];
                    case 4:
                        _a.trys.push([4, 7, , 8]);
                        return [4 /*yield*/, this.dbConn.beginTransaction()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.onQuery(this.dbConn.getConn())];
                    case 6:
                        result = _a.sent();
                        this.isCommand = true;
                        return [2 /*return*/, result];
                    case 7:
                        ex_2 = _a.sent();
                        this.logEx(ex_2, 'command error');
                        return [2 /*return*/, this.createErrOnEx(ex_2)]; // error
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // 커밋 처리
    TRManual.prototype.commit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (false === this.isCommand) {
                            this.release();
                            return [2 /*return*/];
                        }
                        if (undefined === this.dbConn) {
                            this.release();
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.dbConn.commit()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_3 = _a.sent();
                        this.logEx(ex_3, 'commit error');
                        return [3 /*break*/, 4];
                    case 4:
                        try {
                            this.dbConn.release();
                        }
                        catch (ex) {
                            this.logEx(ex, 'release error');
                        }
                        this.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 롤백 처리
    TRManual.prototype.rollback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (false === this.isCommand) {
                            this.release();
                            return [2 /*return*/];
                        }
                        if (undefined === this.dbConn) {
                            this.release();
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.dbConn.rollback()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_4 = _a.sent();
                        this.logEx(ex_4, 'rollback error');
                        return [3 /*break*/, 4];
                    case 4:
                        try {
                            this.dbConn.release();
                        }
                        catch (ex) {
                            this.logEx(ex, 'release error');
                        }
                        this.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TRManual;
}(AbsDbExector_1.AbsDbExector));
exports.TRManual = TRManual;
