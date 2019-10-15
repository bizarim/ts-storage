export class Digit {
    public static readonly btc = 8;
    public static readonly eth = 16;

    public static get(coin: string) {
        switch (coin) {
            case 'btc': return this.btc;
            case 'eth': return this.eth;
            default: return this.btc;
        }
    }
}