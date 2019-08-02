import { eDbEnum } from 'ts-common/dist/enums';
import { DbConfig } from '../mysql/base/DbConfig';
import { DbPools } from '../mysql/impls/DbPools';
import * as fs from 'fs';
import { Pool } from 'mysql2/promise';
import { UpTest } from '../mysql/up/UpTest';

const path = __dirname + '/config.json';

if (!fs.existsSync(path)) {
  throw Error('none exist config file: ' + path);
}
const dbconfig: DbConfig = JSON.parse(fs.readFileSync(path, 'utf8'));
// const config = JSON.parse(fs.readFileSync(path, 'utf8'))

const aa = new DbPools();
aa.initialize(dbconfig).then(() => {

  const pool: Pool = aa.getPool(eDbEnum.test);

  const usp = new UpTest(pool);
  usp.execute().then((result) => {
    console.log('result => ' + result);
  }).catch((err) => {
    console.log('err => ' + err);
  });
}).catch((err) => {
  console.log(err);
});

// Promise.all([usp.execute()]).then().catch()
