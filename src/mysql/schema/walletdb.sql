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

-- 테이블 walletdb.tAccessToken 구조 내보내기
CREATE TABLE IF NOT EXISTS `tAccessToken` (
  `rowIdx` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '줄번호',
  `accIdx` bigint(20) NOT NULL DEFAULT '0' COMMENT '계정 번호',
  `accessToken` varchar(64) NOT NULL DEFAULT '0' COMMENT '접근 토큰',
  `refreshToken` varchar(64) NOT NULL DEFAULT '0' COMMENT '리플레쉬 토큰',
  `accessExpire` datetime NOT NULL COMMENT '접근 토큰 만료일',
  `refreshExpire` datetime NOT NULL COMMENT '리플레쉬 토큰 만료일',
  `recentDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  PRIMARY KEY (`rowIdx`),
  KEY `IX_accToken_accToken` (`accessToken`),
  KEY `IX_accToken_accIdx` (`accIdx`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='AccessToken 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tAccountMst 구조 내보내기
CREATE TABLE IF NOT EXISTS `tAccountMst` (
  `accIdx` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '계정 번호',
  `walletId` varchar(64) NOT NULL COMMENT '지갑 아이디',
  `createDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일자',
  PRIMARY KEY (`accIdx`),
  KEY `IX_accmst_walletId` (`walletId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='계정 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tBlockMst 구조 내보내기
CREATE TABLE IF NOT EXISTS `tBlockMst` (
  `hash` varchar(64) NOT NULL,
  `context` text NOT NULL,
  `regitDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recentDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`hash`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='블럭에 대한 정보';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tCoinDesc 구조 내보내기
CREATE TABLE IF NOT EXISTS `tCoinDesc` (
  `coin` varchar(6) NOT NULL COMMENT '코인',
  `name` varchar(12) NOT NULL COMMENT '코인 이름',
  PRIMARY KEY (`coin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='코인 정의 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tPlatformChannel 구조 내보내기
CREATE TABLE IF NOT EXISTS `tPlatformChannel` (
  `channelIdx` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '줄번호',
  `code` varchar(8) NOT NULL DEFAULT '0' COMMENT '플랫폼 코드',
  `uuid` varchar(64) NOT NULL DEFAULT '0' COMMENT '플랫폼 UUID',
  `accIdx` bigint(20) NOT NULL DEFAULT '0' COMMENT '계정번호',
  `regitDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  PRIMARY KEY (`channelIdx`),
  KEY `IX_platformchannel_code_uuid` (`code`,`uuid`),
  KEY `IX_platformchannel_accIdx` (`accIdx`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='플랫폼 채널링';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tPlatfromDesc 구조 내보내기
CREATE TABLE IF NOT EXISTS `tPlatfromDesc` (
  `code` varchar(8) NOT NULL COMMENT '플랫폼 코드',
  `name` varchar(12) NOT NULL COMMENT '플랫폼 이름',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='다른 플랫폼에 제공되는 코드 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tTransMst 구조 내보내기
CREATE TABLE IF NOT EXISTS `tTransMst` (
  `walletId` varchar(64) NOT NULL COMMENT '지갑아이디',
  `id` varchar(64) NOT NULL COMMENT '트랜잭션아이디',
  `context` text NOT NULL COMMENT '전문',
  `regitDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
  `recentDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '최근 업데이트 일자',
  PRIMARY KEY (`walletId`,`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tTransState 구조 내보내기
CREATE TABLE IF NOT EXISTS `tTransState` (
  `coin` varchar(6) NOT NULL DEFAULT '0' COMMENT '코인',
  `walletId` varchar(64) NOT NULL DEFAULT '0' COMMENT '지갑아이디',
  `transId` varchar(64) NOT NULL COMMENT '트랜젝션 아이디',
  `amount` double NOT NULL COMMENT '수량',
  `state` varchar(16) NOT NULL COMMENT '상태',
  `category` varchar(16) NOT NULL COMMENT '분류',
  `address` varchar(64) NOT NULL COMMENT '주소값',
  `regitDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
  `recentDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '최근 업데이트 일자',
  PRIMARY KEY (`coin`,`walletId`,`transId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='트랜젝션 기록 테이블';

-- 내보낼 데이터가 선택되어 있지 않습니다.
-- 테이블 walletdb.tWalletMst 구조 내보내기
CREATE TABLE IF NOT EXISTS `tWalletMst` (
  `rowIdx` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '줄 번호',
  `coin` varchar(6) NOT NULL DEFAULT '0' COMMENT '코인',
  `id` varchar(64) NOT NULL DEFAULT '0' COMMENT '지갑 아이디',
  `address` varchar(64) NOT NULL DEFAULT '0' COMMENT '주소',
  `balance` double NOT NULL DEFAULT '0' COMMENT '잔액',
  `unconfirmedBalance` double NOT NULL DEFAULT '0' COMMENT '확인 되지 않은 잔액',
  `spendableBalance` double NOT NULL DEFAULT '0' COMMENT '소모 가능 잔액',
  `createDt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일자',
  PRIMARY KEY (`rowIdx`),
  UNIQUE KEY `IX_walletmst_coin_walletId` (`coin`,`id`),
  KEY `IX_walletmst_address` (`address`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='지갑 마스터';

-- 내보낼 데이터가 선택되어 있지 않습니다.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
