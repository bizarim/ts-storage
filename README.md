# ts-storage
ts-storage


api에서 사용 되는 database storage 모듈 제작
 - service layer안에서 database storage layer 호출
 - orm을 사용하지 않고 dbms 사용 하기 원할 때
 - connection pool 관리
 - 변화되는 business logic 만 수정 가능
 - oop 스타일
 - 스트래티지 패턴사용

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

### msyql class diagrams
![databaseClassDiagrams](/doc/classdiagram.png)
