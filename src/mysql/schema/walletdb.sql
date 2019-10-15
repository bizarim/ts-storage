-- --------------------------------------------------------
-- 호스트:                          192.168.4.54
-- 서버 버전:                        5.7.25 - MySQL Community Server (GPL)
-- 서버 OS:                        Linux
-- HeidiSQL 버전:                  10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- walletdb 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `walletdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `walletdb`;

-- 테이블 walletdb.tAddress 구조 내보내기
CREATE TABLE IF NOT EXISTS `tAddress` (
  `memberId` bigint(20) unsigned NOT NULL,
  `coin` varchar(8) NOT NULL,
  `address` varchar(64) NOT NULL,
  PRIMARY KEY (`memberId`,`coin`,`address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tBalance 구조 내보내기
CREATE TABLE IF NOT EXISTS `tBalance` (
  `memberId` bigint(20) unsigned NOT NULL COMMENT '회원번호',
  `coin` varchar(8) NOT NULL COMMENT '코인',
  `balance` double NOT NULL COMMENT '잔액',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '주소 상태',
  `recentDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '최근 변경일자',
  PRIMARY KEY (`memberId`,`coin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='지갑 정보 - 잔액';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tBalanceStatement 구조 내보내기
CREATE TABLE IF NOT EXISTS `tBalanceStatement` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '줄번호',
  `regDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일자',
  `memberId` bigint(20) unsigned NOT NULL COMMENT '주소',
  `coin` varchar(8) NOT NULL COMMENT '코인',
  `amount` double NOT NULL COMMENT '입출금액',
  `type` int(11) NOT NULL COMMENT 'eBalanceType',
  `linkCode` varchar(64) NOT NULL COMMENT '입출 거래연결코드',
  PRIMARY KEY (`rowIdx`,`regDate`),
  KEY `IX_tBalanceStatement_id_coin_amount` (`memberId`,`coin`,`amount`),
  KEY `IX_tBalanceStatement_linkCode` (`linkCode`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COMMENT='지갑 정보 - 입출내역';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tBlockMst 구조 내보내기
CREATE TABLE IF NOT EXISTS `tBlockMst` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '줄번호',
  `providerId` varchar(32) NOT NULL COMMENT '기업아이디',
  `coin` varchar(8) NOT NULL COMMENT '코인',
  `hash` varchar(64) NOT NULL COMMENT '블럭해시',
  `context` text NOT NULL COMMENT '전문',
  `regDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
  PRIMARY KEY (`rowIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='블럭에 대한 정보';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tCoinDefine 구조 내보내기
CREATE TABLE IF NOT EXISTS `tCoinDefine` (
  `coin` varchar(8) NOT NULL COMMENT '코인',
  `name` varchar(12) NOT NULL COMMENT '코인 이름',
  PRIMARY KEY (`coin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='코인 정의 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tLedgerStatement 구조 내보내기
CREATE TABLE IF NOT EXISTS `tLedgerStatement` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `regDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `memberId` bigint(20) unsigned NOT NULL,
  `coin` varchar(8) NOT NULL,
  `type` varchar(8) NOT NULL COMMENT 'eBalanceType',
  `rpcCode` varchar(32) NOT NULL COMMENT 'rpc요청 코드',
  `toFromAddress` varchar(64) NOT NULL,
  `amount` double NOT NULL,
  `commission` double NOT NULL,
  PRIMARY KEY (`rowIdx`,`regDate`),
  KEY `IX_tLedgerStatement_memberId_coin` (`memberId`,`coin`),
  KEY `IX_tLedgerStatement_rpcCode` (`rpcCode`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='node의 원장 - 트랜잭션 요청 상태';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tLedgerTransaction 구조 내보내기
CREATE TABLE IF NOT EXISTS `tLedgerTransaction` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rpcCode` varchar(32) NOT NULL COMMENT 'rpc 요청코드',
  `providerId` varchar(32) NOT NULL,
  `coin` varchar(8) NOT NULL,
  `txId` varchar(64) NOT NULL COMMENT '원장의 트랜잭션아이디',
  `fee` double NOT NULL,
  `status` int(11) NOT NULL COMMENT '상태:요청,대기,완료,취소 (request,pending,confirm,cancel)',
  `regDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일자',
  PRIMARY KEY (`rowIdx`),
  KEY `Ix_tLedgerTransaction_coin_txId` (`coin`,`txId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='node의 원장 - 트랜잭션';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tLedgerUnspentList 구조 내보내기
CREATE TABLE IF NOT EXISTS `tLedgerUnspentList` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `coin` varchar(8) NOT NULL COMMENT '코인',
  `address` varchar(64) NOT NULL COMMENT '주소',
  `providerId` varchar(32) NOT NULL,
  `txid` varchar(64) NOT NULL,
  `amount` double NOT NULL COMMENT '잔액',
  `recentDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '최근 변경일자',
  PRIMARY KEY (`rowIdx`),
  KEY `IX_tLedgerUnspentList_txid` (`txid`),
  KEY `IX_tLedgerUnspentList_providerId` (`providerId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='node의 원장 - 잔액';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tMember 구조 내보내기
CREATE TABLE IF NOT EXISTS `tMember` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `providerId` varchar(32) NOT NULL COMMENT '기업아이디',
  `uuid` varchar(32) NOT NULL COMMENT '기업회원의 고유번호',
  `regDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일자',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IX_tMember_providerId_uuid` (`providerId`,`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=1000008 DEFAULT CHARSET=utf8 COMMENT='기업의 회원 맵핑';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tProvider 구조 내보내기
CREATE TABLE IF NOT EXISTS `tProvider` (
  `code` varchar(8) NOT NULL DEFAULT '0' COMMENT '기업코드',
  `id` varchar(64) NOT NULL DEFAULT '0' COMMENT '기업아이디',
  `regDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
  PRIMARY KEY (`code`),
  UNIQUE KEY `IX_tProvider_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='기업 등록 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tProviderAccount 구조 내보내기
CREATE TABLE IF NOT EXISTS `tProviderAccount` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '줄번호',
  `id` varchar(32) NOT NULL DEFAULT '0' COMMENT '기업아이디',
  `uuid` varchar(32) NOT NULL DEFAULT '0' COMMENT '고유번호',
  `type` varchar(12) NOT NULL DEFAULT '0' COMMENT '타입:mCoinBase,mRecv etc',
  `alias` varchar(12) NOT NULL DEFAULT '0' COMMENT '별칭 부여',
  `regDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록 일자',
  PRIMARY KEY (`rowIdx`),
  UNIQUE KEY `IX_tProviderAccount_uuid` (`uuid`),
  KEY `IX_tProviderAccount_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='기업의 계정들';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tProviderDefine 구조 내보내기
CREATE TABLE IF NOT EXISTS `tProviderDefine` (
  `code` varchar(8) NOT NULL COMMENT 'provider code',
  `providerKey` varchar(32) NOT NULL COMMENT 'provider key',
  `name` varchar(12) NOT NULL COMMENT 'privider 이름',
  PRIMARY KEY (`code`),
  UNIQUE KEY `IX_tProviderDefine_providerKey` (`providerKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='관리되는 기업 정의 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tProviderLimit 구조 내보내기
CREATE TABLE IF NOT EXISTS `tProviderLimit` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`rowIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='기업 회원 제한 및 제재\r\n필요하면 구현!';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tSchedulerBlock 구조 내보내기
CREATE TABLE IF NOT EXISTS `tSchedulerBlock` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `providerId` varchar(32) NOT NULL,
  `coin` varchar(8) NOT NULL,
  `block` varchar(64) NOT NULL,
  `txid` varchar(64) NOT NULL,
  `type` varchar(8) NOT NULL,
  `done` int(11) NOT NULL,
  `regDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rowIdx`),
  KEY `IX_tSchedulerBlock_txid` (`txid`),
  KEY `IX_tSchedulerBlock_block` (`coin`,`block`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tSchedulerVerifyBalance 구조 내보내기
CREATE TABLE IF NOT EXISTS `tSchedulerVerifyBalance` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`rowIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tTokenAccess 구조 내보내기
CREATE TABLE IF NOT EXISTS `tTokenAccess` (
  `providerId` varchar(32) NOT NULL COMMENT '기업 아이디',
  `token` varchar(32) NOT NULL COMMENT '액세스 토큰',
  `nonce` int(10) unsigned NOT NULL DEFAULT '0' COMMENT 'nonce',
  `expireDate` datetime NOT NULL COMMENT '발급일자',
  PRIMARY KEY (`providerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='accessToken 정보';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tTokenRefresh 구조 내보내기
CREATE TABLE IF NOT EXISTS `tTokenRefresh` (
  `providerId` varchar(32) NOT NULL COMMENT '기업아이디',
  `token` varchar(32) NOT NULL COMMENT '토큰',
  `cnt` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '재발급 횟수',
  `updateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '만료 일자',
  PRIMARY KEY (`providerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='refreshtoken 정보';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tTransactionMst 구조 내보내기
CREATE TABLE IF NOT EXISTS `tTransactionMst` (
  `rowIdx` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `coin` varchar(8) NOT NULL COMMENT '코인',
  `providerId` varchar(32) NOT NULL COMMENT '기업아이디',
  `id` varchar(64) NOT NULL COMMENT '트랜잭션아이디',
  `context` text NOT NULL COMMENT '전문',
  `regDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
  PRIMARY KEY (`rowIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='트랜잭션 전문';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tVerifyBalance 구조 내보내기
CREATE TABLE IF NOT EXISTS `tVerifyBalance` (
  `rowIdx` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '줄번호',
  `walletBalance` double NOT NULL COMMENT '지갑 잔액',
  `ledgerBalance` double NOT NULL COMMENT '원장 잔액',
  `diff` double NOT NULL COMMENT '차액',
  `regDate` datetime NOT NULL COMMENT '등록일자',
  PRIMARY KEY (`rowIdx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='일일 잔액 검증 정보';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tWallet 구조 내보내기
CREATE TABLE IF NOT EXISTS `tWallet` (
  `providerId` varchar(32) NOT NULL COMMENT '기업아이디',
  `coin` varchar(8) NOT NULL COMMENT '코인',
  `passphrase` varchar(64) NOT NULL COMMENT '프라이빗키',
  `status` int(11) NOT NULL COMMENT '지갑 생성 상태',
  `updateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`providerId`,`coin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='legder의 passphrase';

-- 내보낼 데이터가 선택되어 있지 않습니다.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
