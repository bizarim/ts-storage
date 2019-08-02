import { PoolConnection } from 'mysql2/promise';

export interface IDbConn {

  release(): void;               // 해제
  open(): Promise<void>;         // 컨넥션 연결
  getConn(): PoolConnection | undefined;     // 컨넥션 얻기
  beginTransaction(): Promise<void>; // 트랜잭션 시작
  commit(): Promise<void>;       // 커밋
  rollback(): Promise<void>;     // 롤백
}
