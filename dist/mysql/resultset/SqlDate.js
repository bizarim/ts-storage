"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateConverter {
    twoDigits(d) {
        if (0 <= d && d < 10)
            return '0' + d.toString();
        if (-10 < d && d < 0)
            return '-0' + (-1 * d).toString();
        return d.toString();
    }
    toSqlDateTime(date) {
        return date.getFullYear()
            + '-' + this.twoDigits(1 + date.getMonth())
            + '-' + this.twoDigits(date.getDate())
            + ' ' + this.twoDigits(date.getHours())
            + ':' + this.twoDigits(date.getMinutes())
            + ':' + this.twoDigits(date.getSeconds());
    }
    toSqlDate(date) {
        return date.getFullYear()
            + '-' + this.twoDigits(1 + date.getMonth())
            + '-' + this.twoDigits(date.getDate())
            + ' 00:00:00';
    }
}
exports.DateConverter = DateConverter;
// 왜 Date를 extends 할수 없는지 확인 필요
class SqlDate {
    constructor(date) {
        this.date = date;
        this.converter = new DateConverter();
    }
    addSeconds(seconds) {
        const aa = new Date(this.date);
        aa.setSeconds(seconds);
        return this.converter.toSqlDateTime(aa);
    }
    addMinutes(seconds) {
        const aa = new Date(this.date);
        aa.setMinutes(seconds);
        return this.converter.toSqlDateTime(aa);
    }
    toSqlDateTime() {
        return this.converter.toSqlDateTime(this.date);
    }
    toSqlDate() {
        return this.converter.toSqlDate(this.date);
    }
    tomarrow() {
        const aa = new Date(this.date);
        aa.setDate(this.date.getDate() + 1);
        return this.converter.toSqlDateTime(aa);
    }
    tomarrowDate() {
        const aa = new Date(this.date);
        aa.setDate(this.date.getDate() + 1);
        return this.converter.toSqlDate(aa);
    }
    yesterdayDate() {
        const aa = new Date(this.date);
        aa.setDate(this.date.getDate() - 1);
        return this.converter.toSqlDate(aa);
    }
}
exports.SqlDate = SqlDate;
//# sourceMappingURL=SqlDate.js.map