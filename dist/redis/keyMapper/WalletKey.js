"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eWalletField;
(function (eWalletField) {
    eWalletField["id"] = "id";
    eWalletField["coin"] = "coin";
    eWalletField["passphrase"] = "passphrase";
})(eWalletField = exports.eWalletField || (exports.eWalletField = {}));
class RhoWallet {
}
exports.RhoWallet = RhoWallet;
class WalletKey {
    /**
     * hash key 얻기
     * @param id provider id
     * @param coin 코인
     */
    getKey(id, coin) {
        return `wallet_${id}_${coin}`;
    }
    getField(field) {
        return eWalletField[field];
    }
}
exports.WalletKey = WalletKey;
//# sourceMappingURL=WalletKey.js.map