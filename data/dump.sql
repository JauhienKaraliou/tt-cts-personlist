/*
SQLyog Ultimate v11.52 (32 bit)
MySQL - 5.6.24 : Database - tt-cts-personlist
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tt-cts-personlist` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `tt-cts-personlist`;

/*Table structure for table `City` */

DROP TABLE IF EXISTS `City`;

CREATE TABLE `City` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `City` */

/*Table structure for table `Education` */

DROP TABLE IF EXISTS `Education`;

CREATE TABLE `Education` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `Education` */

/*Table structure for table `Person` */

DROP TABLE IF EXISTS `Person`;

CREATE TABLE `Person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `Person` */

/*Table structure for table `person_city` */

DROP TABLE IF EXISTS `person_city`;

CREATE TABLE `person_city` (
  `person_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  PRIMARY KEY (`person_id`,`city_id`),
  KEY `IDX_A7BD861F217BBB47` (`person_id`),
  KEY `IDX_A7BD861F8BAC62AF` (`city_id`),
  CONSTRAINT `FK_A7BD861F217BBB47` FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`),
  CONSTRAINT `FK_A7BD861F8BAC62AF` FOREIGN KEY (`city_id`) REFERENCES `City` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `person_city` */

/*Table structure for table `person_education` */

DROP TABLE IF EXISTS `person_education`;

CREATE TABLE `person_education` (
  `person_id` int(11) NOT NULL,
  `education_id` int(11) NOT NULL,
  PRIMARY KEY (`person_id`,`education_id`),
  KEY `IDX_6323BD78217BBB47` (`person_id`),
  KEY `IDX_6323BD782CA1BD71` (`education_id`),
  CONSTRAINT `FK_6323BD78217BBB47` FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`),
  CONSTRAINT `FK_6323BD782CA1BD71` FOREIGN KEY (`education_id`) REFERENCES `Education` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `person_education` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
