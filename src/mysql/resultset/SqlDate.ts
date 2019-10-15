import { IResultSet } from 'ts-common';

export class DateConverter {

    twoDigits(d: number) {
        if (0 <= d && d < 10) return '0' + d.toString();
        if (-10 < d && d < 0) return '-0' + (-1 * d).toString();
        return d.toString();
    }

    toSqlDateTime(date: Date): string {
        return date.getFullYear()
            + '-' + this.twoDigits(1 + date.getMonth())
            + '-' + this.twoDigits(date.getDate())
            + ' ' + this.twoDigits(date.getHours())
            + ':' + this.twoDigits(date.getMinutes())
            + ':' + this.twoDigits(date.getSeconds());
    }

    toSqlDate(date: Date): string {
        return date.getFullYear()
            + '-' + this.twoDigits(1 + date.getMonth())
            + '-' + this.twoDigits(date.getDate())
            + ' 00:00:00';
    }
}

// 왜 Date를 extends 할수 없는지 확인 필요
export class SqlDate implements IResultSet {

    private date: Date;
    public converter: DateConverter;

    constructor(date: Date) {
        this.date = date;
        this.converter = new DateConverter();
    }

    addSeconds(seconds: number): string {
        const aa = new Date(this.date);
        aa.setSeconds(seconds);
        return this.converter.toSqlDateTime(aa);
    }

    addMinutes(seconds: number): string {
        const aa = new Date(this.date);
        aa.setMinutes(seconds);
        return this.converter.toSqlDateTime(aa);
    }

    toSqlDateTime(): string {
        return this.converter.toSqlDateTime(this.date);
    }

    toSqlDate(): string {
        return this.converter.toSqlDate(this.date);
    }

    tomarrow(): string {
        const aa = new Date(this.date);
        aa.setDate(this.date.getDate() + 1);
        return this.converter.toSqlDateTime(aa);
    }

    tomarrowDate(): string {
        const aa = new Date(this.date);
        aa.setDate(this.date.getDate() + 1);
        return this.converter.toSqlDate(aa);
    }

    yesterdayDate(): string {
        const aa = new Date(this.date);
        aa.setDate(this.date.getDate() - 1);
        return this.converter.toSqlDate(aa);
    }
}
