"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_common_1 = require("ts-common");
/**
 *  Procedure result: resultset 이 없는 경우 단순 성공 실패 결과만 필요한 경우
 */
class UrtNotFindIds {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtNotFindIds = UrtNotFindIds;
/**
 * user procedure result: provider 등록
 */
class UrtProviderRegister {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtProviderRegister = UrtProviderRegister;
/**
 * user procedure result:
 */
class UrtRegenTokenAccess {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtRegenTokenAccess = UrtRegenTokenAccess;
/**
 * user procedure result:
 */
class UrtRegenTokenRefresh {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtRegenTokenRefresh = UrtRegenTokenRefresh;
class UrtGetAddress {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtGetAddress = UrtGetAddress;
/**
 * user procedure result:
 */
class UrtCreateWallet {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtCreateWallet = UrtCreateWallet;
// UpGetPassPhrase
class UrtGetPassPhrase {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtGetPassPhrase = UrtGetPassPhrase;
class UrtGetBalance {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtGetBalance = UrtGetBalance;
class UrtFluctuates {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtFluctuates = UrtFluctuates;
class UrtBalanceStatement {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtBalanceStatement = UrtBalanceStatement;
class UrtLedgerStatement {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtLedgerStatement = UrtLedgerStatement;
class UrtSendCoins {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtSendCoins = UrtSendCoins;
class UrtLedgerTransaction {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtLedgerTransaction = UrtLedgerTransaction;
class UrtLedgerTransactions {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtLedgerTransactions = UrtLedgerTransactions;
class UrtGetSchedulerBlocks {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtGetSchedulerBlocks = UrtGetSchedulerBlocks;
class UrtGetProvider {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtGetProvider = UrtGetProvider;
class UrtLedgerTransactionWithJoin {
    constructor() {
        this.errcode = ts_common_1.eErrorCode.Success;
    }
}
exports.UrtLedgerTransactionWithJoin = UrtLedgerTransactionWithJoin;
//# sourceMappingURL=UpResult.js.map