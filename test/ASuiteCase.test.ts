import { expect } from 'chai';
import { eErrorCode, eDb } from 'ts-common';
import { UpXXXXXXX, UrcSetXXXXX } from '../src';
import { StorageService } from '../src/service/StorageService';

describe('ASuiteCase.test', function () {

    it('mysql 사용 방법', async function () {
        const storage = new StorageService();

        const urt = await storage
            .getProcedure(eDb.wallet, UpXXXXXXX)
            .initParams('', '', 0)
            .execute();

        if (eErrorCode.Success !== urt.errcode) {

        }


    });

    it('사용 방법', async function () {
        const storage = new StorageService();
        const urcRt = await storage
            .getRedisCommand(UrcSetXXXXX)
            .initParam('', '')
            .execute();

        if (eErrorCode.Success !== urcRt.errcode) {

        }
    });
});