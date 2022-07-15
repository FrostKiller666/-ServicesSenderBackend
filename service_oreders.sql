-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.18-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.3.0.6370
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Zrzut struktury bazy danych service_orders
CREATE DATABASE IF NOT EXISTS `service_orders` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `service_orders`;

-- Zrzut struktury tabela service_orders.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `pointName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `part` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quality` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(5) NOT NULL DEFAULT 0,
  `information` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guarantee` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `arrived` tinyint(1) NOT NULL DEFAULT 0,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_orders_users` (`userId`),
  CONSTRAINT `FK_orders_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='All orders sended to main service. ';

-- Zrzucanie danych dla tabeli service_orders.orders: ~0 rows (około)
INSERT INTO `orders` (`id`, `pointName`, `model`, `part`, `color`, `quality`, `price`, `information`, `guarantee`, `arrived`, `userId`) VALUES
	('15e6bd5e-d8d3-4253-8531-dd599f3e46eb', 'Plaza Lokal', 'Iphone 7', 'Wyświetlacz', 'Biały', 'Oryginał', 450, 'Zrob aby dotarło jak najszybcije, pls.', 'TAK', 0, '15432870-b884-4906-834d-63bca23e8f61'),
	('6023dde1-700e-40a8-887e-d40a916e54f6', 'Plaza Lokal', 'Xiaomi Note 10s', 'Gniazdo ładowania', '', 'Oryginał', 150, 'Klient musi mieć telefon zadwa dni, a wieszjak jest z gwarancjami', 'TAK', 0, '15432870-b884-4906-834d-63bca23e8f61'),
	('ea1af857-84c2-474e-b07e-58de3b0e2064', 'Plaza Lokal', 'Samung Galaxy 8', 'Gniazdo ładowania', 'Srebrny', 'Oryginał', 3232, '123213211311', 'NIE', 0, '15432870-b884-4906-834d-63bca23e8f61');

-- Zrzut struktury tabela service_orders.question
CREATE TABLE IF NOT EXISTS `question` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `pointName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `part` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quality` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `information` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `arrived` tinyint(1) NOT NULL DEFAULT 0,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_question_users` (`userId`),
  CONSTRAINT `FK_question_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Zrzucanie danych dla tabeli service_orders.question: ~4 rows (około)
INSERT INTO `question` (`id`, `pointName`, `model`, `part`, `color`, `quality`, `information`, `arrived`, `userId`) VALUES
	('1003f0ce-ba13-497b-93e6-cb1d3cfb87aa', 'Wielka Babia Góra', 'xiaomi note 9', 'Gniazdo ładowania', '', 'Oryginał', 'asldfkj\'ask\'ldfnk,hj;ldfask,jn/lsaf', 0, '15432870-b884-4906-834d-63bca23e8f61'),
	('4519cd4e-3b0b-4f25-b3d6-2f4de677f5d6', 'Plaza Lokal', 'Xiaomi Note 10s', 'Wyświetlacz', 'Zielony', 'Oryginał', 'Jeśli dostępna to w jakim terminie najszybciej mogę otrzymać zamówienie. ', 0, '15432870-b884-4906-834d-63bca23e8f61'),
	('89e10b82-4027-4e4a-a0fa-c906bfb5fb0b', 'Zielone Arkady', 'Iphone 7', 'Gniazdo ładowania', '', 'Oryginał', 'Mam nadzieję, że dojdzie jak najszybciej !!!!  ^^"', 0, '15432870-b884-4906-834d-63bca23e8f61'),
	('ca934323-ced9-44c7-9c5e-bcb04e74588a', 'Arakdy', 'Alcatel', 'Wyświetlacz', 'Biały', 'Oryginał', 'Czy dacie rade ogarnąć sprzęt do białegho alcatela', 0, '15432870-b884-4906-834d-63bca23e8f61'),
	('f2489571-942a-4fba-acd8-5f8079683720', 'Plaza Lokal', 'Alcatel', 'Gniazdo ładowania', 'Fioletowy', 'Pulled', 'asfasfasfasfassafafasfasfasfasfasfasfassafafasfasfasfasfasfasfassafafasfasfasfasfasfasfassafafasfasfasfasfasfasfassafafasfasfasfasfasfasfassafafasfasfasfasfasfasfassafafasfasf', 0, '15432870-b884-4906-834d-63bca23e8f61');

-- Zrzut struktury tabela service_orders.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `username` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(72) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='All data of users.';

-- Zrzucanie danych dla tabeli service_orders.users: ~5 rows (około)
INSERT INTO `users` (`id`, `username`, `email`, `password`) VALUES
	('15432870-b884-4906-834d-63bca23e8f61', 'KaskaderRewolucjonista', 'test1@test.com', '$2b$10$hOJHGsrLud2FZrTfhSkNfumbSOMCoa6O5QdElDDjgybP6xvscbmoS'),
	('5232f646-26dd-457d-865e-232d815a18ae', 'KaskadowyMecenas', 'kaskadowiec@kask.com', '$2b$10$MR9Rr41eB0wm8l1/XV6EmuPwl.Pg6bKbWOvH.pi3DW6N1C1Welqbi'),
	('6dca85f4-f474-401b-8b85-dd0e022cfc0c', 'KaskaderOdManufaktury', 'manufaktura@test.com', '$2b$10$Ha.w7I0kgImjlKzGMZKwD.z8mpN1zsHG65J.FO2Ce3X3LzZTj7QBO'),
	('749c2b8c-ae67-4950-99eb-5a973ddec152', 'kornolix', 'kornolix@gmail.com', '$2b$10$9DBcmjLkdWhi/Y2d6ZhIPuBgixq5wbLlYNV3GhNF7VH0jF1m5vVcq'),
	('857df33a-6cfd-4df5-a536-e36455637ac5', 'Testowy3', 'test2@test.com', '$2b$10$AYe3YyYg4VY/EewImuXO2.qtGF4NCyTjNowMZf0i6O631L4TC2UzG');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
