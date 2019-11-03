import { IResultSet } from 'ts-common';
export declare class DateConverter {
    twoDigits(d: number): string;
    toSqlDateTime(date: Date): string;
    toSqlDate(date: Date): string;
}
export declare class SqlDate implements IResultSet {
    private date;
    converter: DateConverter;
    constructor(date: Date);
    addSeconds(seconds: number): string;
    addMinutes(seconds: number): string;
    toSqlDateTime(): string;
    toSqlDate(): string;
    tomarrow(): string;
    tomarrowDate(): string;
    yesterdayDate(): string;
}
