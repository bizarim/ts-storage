import { eErrorCode, IUpParams, ParamsSendCondition } from 'ts-common';
import { RtsLedgerTransactionWithJoin } from '.';


export class ParamsSendInfo implements IUpParams {
    // to address, amount
    type: string;
    address: string;
    memberId: number;
    amount: number;
    commission: number;

    getTotal(): number {
        return this.amount + this.commission;
    }
}


export class InParamsSendCoins implements IUpParams {
    providerId: string;
    coin: string;
    // mother sum
    sum: number;
    list: ParamsSendInfo[];
}

export class OutParamsSendCoins implements IUpParams {
    rejects: ParamsSendCondition[];
    confirms: ParamsSendCondition[];
}




export class ParamsUpDeposite implements IUpParams {
    memberId: number;
    coin: string;
    address: string;
    providerId: string;
    txid: string;
    category: string;
    amount: number;
    fee: number;
}

export class ParamsVout {
    txid: string;
    value: number;
    address: string;
}

export class ParamsUpSendCoinsConfirm implements IUpParams {
    vins: string[];
    vouts: ParamsVout[];
    senders: RtsLedgerTransactionWithJoin[];
    provierId: string;

    txid: string;
}