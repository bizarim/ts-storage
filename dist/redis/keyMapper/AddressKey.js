"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eAddressField;
(function (eAddressField) {
    eAddressField["memberId"] = "memberId";
    eAddressField["coin"] = "coin";
    eAddressField["address"] = "address";
})(eAddressField = exports.eAddressField || (exports.eAddressField = {}));
class RhoAddress {
}
exports.RhoAddress = RhoAddress;
class AddressKey {
    /**
     * hash key 얻기
     * @param coin 코인
     * @param address 주소
     */
    getKey(coin, address) {
        return `address_${coin}_${address}`;
    }
    getField(field) {
        return eAddressField[field];
    }
}
exports.AddressKey = AddressKey;
//# sourceMappingURL=AddressKey.js.map