"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eProviderField;
(function (eProviderField) {
    eProviderField["id"] = "id";
    eProviderField["tokenAccess"] = "tokenAccess";
    eProviderField["tokenRefresh"] = "tokenRefresh";
    eProviderField["nonce"] = "nonce";
})(eProviderField = exports.eProviderField || (exports.eProviderField = {}));
class RhoProvider {
}
exports.RhoProvider = RhoProvider;
class ProviderKey {
    getKey(code) {
        return `provider_${code}`;
    }
    getField(field) {
        return eProviderField[field];
    }
}
exports.ProviderKey = ProviderKey;
//# sourceMappingURL=ProviderKey.js.map