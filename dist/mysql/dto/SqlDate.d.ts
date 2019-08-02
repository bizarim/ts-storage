export declare class SqlDate {
    private date;
    constructor(date: Date);
    toSqlDateTime(): string;
    toSqlDate(): string;
    tomarrow(): string;
    tomarrowDate(): string;
    yesterdayDate(): string;
}
