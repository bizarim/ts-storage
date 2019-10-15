import { IUpResult, eErrorCode } from 'ts-common';
import { RtsPassPhrase, OutParamsSendCoins } from '.';
import { RtsBalance, RtsBalanceStatement, RtsLedgerStatement, RtsLedgerTransaction, RtsSchedulerBlock, RtsJoinProvider, RtsLedgerTransactionWithJoin, RtsProviderRegister, RtsAddress } from './ResultSets';
/**
 *  Procedure result: resultset 이 없는 경우 단순 성공 실패 결과만 필요한 경우
 */
export declare class UrtNotFindIds implements IUpResult {
    errcode: eErrorCode;
    context: string[] | undefined;
}
/**
 * user procedure result: provider 등록
 */
export declare class UrtProviderRegister implements IUpResult {
    errcode: eErrorCode;
    context: RtsProviderRegister | undefined;
}
/**
 * user procedure result:
 */
export declare class UrtRegenTokenAccess implements IUpResult {
    errcode: eErrorCode;
    context: {
        providerId: string;
        accessToken: string;
        accessExpireSec: number;
    } | undefined;
}
/**
 * user procedure result:
 */
export declare class UrtRegenTokenRefresh implements IUpResult {
    errcode: eErrorCode;
    context: {
        providerId: string;
        accessToken: string;
        refreshToken: string;
        accessExpireSec: number;
    } | undefined;
}
export declare class UrtGetAddress implements IUpResult {
    errcode: eErrorCode;
    context: RtsAddress | undefined;
}
/**
 * user procedure result:
 */
export declare class UrtCreateWallet implements IUpResult {
    errcode: eErrorCode;
    context: {
        coin: string;
        providerId: string;
        status: number;
        memberId: number;
    } | undefined;
}
export declare class UrtGetPassPhrase implements IUpResult {
    errcode: eErrorCode;
    context: RtsPassPhrase | undefined;
}
export declare class UrtGetBalance implements IUpResult {
    errcode: eErrorCode;
    context: RtsBalance | undefined;
}
export declare class UrtFluctuates implements IUpResult {
    errcode: eErrorCode;
    context: RtsBalance[] | undefined;
}
export declare class UrtBalanceStatement implements IUpResult {
    errcode: eErrorCode;
    context: {
        totPage: number;
        curPage: number;
        offset: number;
        list: RtsBalanceStatement[];
    } | undefined;
}
export declare class UrtLedgerStatement implements IUpResult {
    errcode: eErrorCode;
    context: {
        totPage: number;
        curPage: number;
        offset: number;
        list: RtsLedgerStatement[];
    } | undefined;
}
export declare class UrtSendCoins implements IUpResult {
    errcode: eErrorCode;
    context: OutParamsSendCoins | undefined;
}
export declare class UrtLedgerTransaction implements IUpResult {
    errcode: eErrorCode;
    context: RtsLedgerTransaction | undefined;
}
export declare class UrtLedgerTransactions implements IUpResult {
    errcode: eErrorCode;
    context: RtsLedgerTransaction[] | undefined;
}
export declare class UrtGetSchedulerBlocks implements IUpResult {
    errcode: eErrorCode;
    context: RtsSchedulerBlock[] | undefined;
}
export declare class UrtGetProvider implements IUpResult {
    errcode: eErrorCode;
    context: RtsJoinProvider | undefined;
}
export declare class UrtLedgerTransactionWithJoin implements IUpResult {
    errcode: eErrorCode;
    context: RtsLedgerTransactionWithJoin[] | undefined;
}
