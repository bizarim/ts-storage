import { IUpResult, eErrorCode } from 'ts-common';
import { RtsPassPhrase, OutParamsSendCoins } from '.';
import { RtsBalance, RtsBalanceStatement, RtsLedgerStatement, RtsLedgerTransaction, RtsSchedulerBlock, RtsJoinProvider, RtsLedgerTransactionWithJoin, RtsProviderRegister, RtsAddress } from './ResultSets';

/**
 *  Procedure result: resultset 이 없는 경우 단순 성공 실패 결과만 필요한 경우
 */
export class UrtNotFindIds implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: string[] | undefined;
}

/**
 * user procedure result: provider 등록
 */
export class UrtProviderRegister implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsProviderRegister | undefined;
}

/**
 * user procedure result:
 */
export class UrtRegenTokenAccess implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: {
        providerId: string;
        accessToken: string;
        accessExpireSec: number;
    } | undefined;
}

/**
 * user procedure result:
 */
export class UrtRegenTokenRefresh implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: {
        providerId: string;
        accessToken: string;
        refreshToken: string;
        accessExpireSec: number;
    } | undefined;
}

export class UrtGetAddress implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsAddress | undefined;
}

/**
 * user procedure result:
 */
export class UrtCreateWallet implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: {
        coin: string;
        providerId: string;
        status: number;
        memberId: number;
    } | undefined;
}

// UpGetPassPhrase
export class UrtGetPassPhrase implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsPassPhrase | undefined;
}

export class UrtGetBalance implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsBalance | undefined;
}


export class UrtFluctuates implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsBalance[] | undefined;
}

export class UrtBalanceStatement implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: {
        totPage: number;
        curPage: number;
        offset: number;
        list: RtsBalanceStatement[];
    } | undefined;
}

export class UrtLedgerStatement implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: {
        totPage: number;
        curPage: number;
        offset: number;
        list: RtsLedgerStatement[];
    } | undefined;
}

export class UrtSendCoins implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: OutParamsSendCoins | undefined;
}

export class UrtLedgerTransaction implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsLedgerTransaction | undefined;
}

export class UrtLedgerTransactions implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsLedgerTransaction[] | undefined;
}


export class UrtGetSchedulerBlocks implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsSchedulerBlock[] | undefined;
}


export class UrtGetProvider implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsJoinProvider | undefined;
}

export class UrtLedgerTransactionWithJoin implements IUpResult {
    errcode: eErrorCode = eErrorCode.Success;
    context: RtsLedgerTransactionWithJoin[] | undefined;
}