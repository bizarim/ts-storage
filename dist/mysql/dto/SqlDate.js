"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function twoDigits(d) {
    if (0 <= d && d < 10)
        return '0' + d.toString();
    if (-10 < d && d < 0)
        return '-0' + (-1 * d).toString();
    return d.toString();
}
var SqlDate = /** @class */ (function () {
    function SqlDate(date) {
        this.date = date;
    }
    SqlDate.prototype.toSqlDateTime = function () {
        return this.date.getFullYear()
            + '-' + twoDigits(1 + this.date.getMonth())
            + '-' + twoDigits(this.date.getDate())
            + ' ' + twoDigits(this.date.getHours())
            + ':' + twoDigits(this.date.getMinutes())
            + ':' + twoDigits(this.date.getSeconds());
    };
    SqlDate.prototype.toSqlDate = function () {
        return this.date.getFullYear()
            + '-' + twoDigits(1 + this.date.getMonth())
            + '-' + twoDigits(this.date.getDate())
            + ' 00:00:00';
    };
    SqlDate.prototype.tomarrow = function () {
        var aa = new Date(this.date);
        aa.setDate(this.date.getDate() + 1);
        return new SqlDate(aa).toSqlDateTime();
    };
    SqlDate.prototype.tomarrowDate = function () {
        var aa = new Date(this.date);
        aa.setDate(this.date.getDate() + 1);
        return new SqlDate(aa).toSqlDate();
    };
    SqlDate.prototype.yesterdayDate = function () {
        var aa = new Date(this.date);
        aa.setDate(this.date.getDate() - 1);
        return new SqlDate(aa).toSqlDate();
    };
    return SqlDate;
}());
exports.SqlDate = SqlDate;
