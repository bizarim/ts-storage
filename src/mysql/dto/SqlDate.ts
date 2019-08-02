
function twoDigits(d: any) {
  if (0 <= d && d < 10) return '0' + d.toString();
  if (-10 < d && d < 0) return '-0' + (-1 * d).toString();
  return d.toString();
}

export class SqlDate {
  private date: Date;
  constructor(date: Date) {
    this.date = date;
  }

  toSqlDateTime(): string {
    return this.date.getFullYear()
      + '-' + twoDigits(1 + this.date.getMonth())
      + '-' + twoDigits(this.date.getDate())
      + ' ' + twoDigits(this.date.getHours())
      + ':' + twoDigits(this.date.getMinutes())
      + ':' + twoDigits(this.date.getSeconds());
  }

  toSqlDate(): string {
    return this.date.getFullYear()
      + '-' + twoDigits(1 + this.date.getMonth())
      + '-' + twoDigits(this.date.getDate())
      + ' 00:00:00';
  }

  tomarrow(): string {
    const aa = new Date(this.date);
    aa.setDate(this.date.getDate() + 1);
    return new SqlDate(aa).toSqlDateTime();
  }

  tomarrowDate(): string {
    const aa = new Date(this.date);
    aa.setDate(this.date.getDate() + 1);
    return new SqlDate(aa).toSqlDate();
  }

  yesterdayDate(): string {
    const aa = new Date(this.date);
    aa.setDate(this.date.getDate() - 1);
    return new SqlDate(aa).toSqlDate();
  }
}
