import { expect } from 'chai';
import { eErrorCode, eDb } from 'ts-common';
import { RaoSetXXXXX, DaoXXXXXXX } from '../src';
import { StorageService } from '../src/service/StorageService';

describe('ASuiteCase.test', function () {

    it('mysql 사용 방법', async function () {
        const storage = new StorageService();

        const urt = await storage
            .getDao(eDb.wallet, DaoXXXXXXX)
            .initParams('', '', 0)
            .execute();

        if (eErrorCode.Success !== urt.errcode) {

        }


    });

    it('레디스 사용 방법', async function () {
        const storage = new StorageService();
        const urcRt = await storage
            .getRao(RaoSetXXXXX)
            .initParam('', '')
            .execute();

        if (eErrorCode.Success !== urcRt.errcode) {

        }
    });
});