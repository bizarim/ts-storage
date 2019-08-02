import { PoolConnection } from 'mysql2/promise';
import { IUpResult } from 'ts-common/dist/interface';

export interface IDbLogging {
  logger?: any;
  createErrOnEx(ex: any): IUpResult;
  createErr(): IUpResult;
  logEx(ex: any, msg: string): void;
  loggingQueryError(ex: any): void;
}

/**
 *  쿼리 실행자 인터페이스
 */
export interface IDbExector extends IDbLogging {
  release(): void; // 자원 해제
  execute(): Promise<IUpResult>; // 비동기 실행 (autocommit)
  onQuery(conn: PoolConnection): Promise<IUpResult>; // 실행 쿼리들
  onResult(result: IUpResult): IUpResult; // 결과 가공 처리
  command(): Promise<IUpResult>;  // 명령어 실행 (none autocommit)
}
