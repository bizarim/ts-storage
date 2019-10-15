import { IUpResult, eDb, ILogger } from 'ts-common';
import { DbConfig } from './DbConfig';
import { PoolConnection, Pool } from '../index';

/**
 * db 행동자 인터페이스
 */
export interface IDbBehavior {

    /**
     * 자원 해제
     */
    release(): void;

    /**
     * 컨넥션 연결
     */
    open(): Promise<void>;

    /**
     * 컨넥션 얻어오기
     */
    getConn(): PoolConnection | undefined;

    /**
     * 트랜잭션 시작
     */
    beginTransaction(): Promise<void>;

    /**
     * 커밋
     */
    commit(): Promise<void>;

    /**
     * 롤백
     */
    rollback(): Promise<void>;
}

/**
 * db db Logger able 인터페이스
 */
export interface IDbLoggerable {
    /**
     * 로거
     */
    logger?: ILogger;
    /**
     * DbError 발생
     * @param ex exception
     */
    createErrOnEx(ex: any): IUpResult;
    /**
     * DbError 발생
     */
    createErr(): IUpResult;
    /**
     * 로깅
     * @param ex exception
     * @param msg message
     */
    logEx(ex: any, msg: string): void;
    /**
     * 쿼리 실행 중 오류 로깅
     * @param ex exception
     */
    loggingQueryError(ex: any): void;
}

/**
 * 쿼리 실행자 인터페이스
 */
export interface IDbExector extends IDbLoggerable {
    initialize(pool: Pool, logger?: ILogger): IDbExector;
    /**
     * 자원 해제
     */
    release(): void;
    /**
     *  비동기 실행
     */
    execute(): Promise<IUpResult>;
    /**
     * 실행 쿼리들
     * @param conn db connection
     */
    onQuery(conn: PoolConnection): Promise<IUpResult>;
    /**
     *  결과 가공 처리
     * @param result 결과
     */
    onResult(result: IUpResult): IUpResult;
    /**
     * 명령어 실행
     */
    command(): Promise<IUpResult>;
}

/**
 * db pool container 인터페이스
 */
export interface IDbPools {
    /**
     * 풀 얻어오기
     * @param db db 선택
     */
    getPool(db: eDb): Pool | undefined;
    /**
     * 설정
     * @param config db config
     */
    initialize(config: DbConfig | any): Promise<void>;
}
