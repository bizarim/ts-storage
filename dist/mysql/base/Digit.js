"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Digit {
    static get(coin) {
        switch (coin) {
            case 'btc': return this.btc;
            case 'eth': return this.eth;
            default: return this.btc;
        }
    }
}
exports.Digit = Digit;
Digit.btc = 8;
Digit.eth = 16;
//# sourceMappingURL=Digit.js.map