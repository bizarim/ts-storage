"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("ts-common/dist/enums");
var DbPools_1 = require("../mysql/impls/DbPools");
var fs = require("fs");
var UpTest_1 = require("../mysql/up/UpTest");
var path = __dirname + '/config.json';
if (!fs.existsSync(path)) {
    throw Error('none exist config file: ' + path);
}
var dbconfig = JSON.parse(fs.readFileSync(path, 'utf8'));
// const config = JSON.parse(fs.readFileSync(path, 'utf8'))
var aa = new DbPools_1.DbPools();
aa.initialize(dbconfig).then(function () {
    var pool = aa.getPool(enums_1.eDbEnum.test);
    var usp = new UpTest_1.UpTest(pool);
    usp.execute().then(function (result) {
        console.log('result => ' + result);
    }).catch(function (err) {
        console.log('err => ' + err);
    });
}).catch(function (err) {
    console.log(err);
});
// Promise.all([usp.execute()]).then().catch()
