import { IUpParams, ParamsSendCondition } from 'ts-common';
import { RtsLedgerTransactionWithJoin } from '.';
export declare class ParamsSendInfo implements IUpParams {
    type: string;
    address: string;
    memberId: number;
    amount: number;
    commission: number;
    getTotal(): number;
}
export declare class InParamsSendCoins implements IUpParams {
    providerId: string;
    coin: string;
    sum: number;
    list: ParamsSendInfo[];
}
export declare class OutParamsSendCoins implements IUpParams {
    rejects: ParamsSendCondition[];
    confirms: ParamsSendCondition[];
}
export declare class ParamsUpDeposite implements IUpParams {
    memberId: number;
    coin: string;
    address: string;
    providerId: string;
    txid: string;
    category: string;
    amount: number;
    fee: number;
}
export declare class ParamsVout {
    txid: string;
    value: number;
    address: string;
}
export declare class ParamsUpSendCoinsConfirm implements IUpParams {
    vins: string[];
    vouts: ParamsVout[];
    senders: RtsLedgerTransactionWithJoin[];
    provierId: string;
    txid: string;
}
