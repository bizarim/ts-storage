# ts-storage
ts-storage


api에서 사용 되는 storage 모듈 제작
 - service layer안에서 storage layer 호출
 - orm을 사용하지 않고 dbms 사용 하기 원할 때
 - 변화되는 business logic 만 수정 가능
 - connection pool 자동 관리
 - 상속으로 트랜잭션 관리
 - 프록시, 스트래티지 패턴사용
 - 종류: mysql, redis

## directory
```sh
│  README.md
├─dist
├─doc
├─src
│  ├─mysql
│  ├─redis
│  └─service
└─test

```

## mysql 사용법
```javascript 
    const storage = new StorageService();
    const urt = await storage
        .getDao(eDb.wallet, DaoXXXXXXX)
        .initParams('arg1', 'arg2', 0)
        .execute();

    if (eErrorCode.Success !== urt.errcode) {

    }

```

## Redis 사용법
```javascript 
    const storage = new StorageService();
    const urcRt = await storage
        .getRao(RaoSetXXXXX)
        .initParam('arg1', 'arg2')
        .execute();

    if (eErrorCode.Success !== urcRt.errcode) {

    }

```


### msyql class diagrams
![databaseClassDiagrams](/doc/classdiagram.png)
