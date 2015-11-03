-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 03 2015 г., 12:52
-- Версия сервера: 5.5.41-log
-- Версия PHP: 5.4.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `resource_registry`
--

-- --------------------------------------------------------

--
-- Структура таблицы `attribute_class_view`
--

CREATE TABLE IF NOT EXISTS `attribute_class_view` (
  `view_id` int(11) NOT NULL AUTO_INCREMENT,
  `attribute_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  PRIMARY KEY (`view_id`),
  KEY `fk_attribute_class_view_resource_attribute1_idx` (`attribute_id`),
  KEY `fk_attribute_class_view_resource_class1_idx` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `operation`
--

CREATE TABLE IF NOT EXISTS `operation` (
  `operation_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_log` datetime NOT NULL,
  `type_id` int(11) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `resource_id` int(11) NOT NULL,
  `before_change` text,
  PRIMARY KEY (`operation_id`),
  KEY `fk_transactions_transaction_type1_idx` (`type_id`),
  KEY `fk_transactions_users1_idx` (`user_id`),
  KEY `fk_operation_resource1_idx` (`resource_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп данных таблицы `operation`
--

INSERT INTO `operation` (`operation_id`, `date_log`, `type_id`, `user_id`, `resource_id`, `before_change`) VALUES
(4, '2015-10-27 14:04:25', 2, 'Петренко Петро Петрович\nпаспортні дані : EE123456', 96, 'дата створення : 2015-10-04 -> 2015-10-11|'),
(5, '2015-10-27 14:05:54', 2, 'Петренко Петро Петрович\nпаспортні дані : EE123456', 96, 'дата створення : 1970-01-08 -> 2015-10-27|'),
(6, '2015-10-27 14:06:41', 2, 'Петренко Петро Петрович\nпаспортні дані : EE123456', 48, 'дата створення : 2015-10-27 -> 1970-01-01|'),
(7, '2015-10-27 14:07:09', 2, 'Петренко Петро Петрович\nпаспортні дані : EE123456', 48, 'дата створення : 1970-01-01 -> 1970-01-02|'),
(9, '2015-10-29 21:47:10', 2, 'Петро Петро Петро| \r\n	паспортні дані : EE 123456', 96, 'назва ресурсу: Митрополивчі сади->Митрополивчі сад|'),
(10, '2015-10-29 21:47:47', 2, 'Петро Петро Петро| \r\n	паспортні дані : EE 123456', 97, 'назва ресурсу: Піскові Озера->Піскові Озера Старі|'),
(11, '2015-10-29 21:48:09', 2, '', 99, 'назва ресурсу: Стрий Самбір->Самбір|');

-- --------------------------------------------------------

--
-- Структура таблицы `operation_type`
--

CREATE TABLE IF NOT EXISTS `operation_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `operation_type`
--

INSERT INTO `operation_type` (`type_id`, `name`) VALUES
(1, 'Створення ресурсу'),
(2, 'Редагування ресурсу'),
(3, 'Видалення ресурсу');

-- --------------------------------------------------------

--
-- Структура таблицы `parameter`
--

CREATE TABLE IF NOT EXISTS `parameter` (
  `parameter_id` int(11) NOT NULL AUTO_INCREMENT,
  `value` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `attribute_id` int(11) NOT NULL,
  PRIMARY KEY (`parameter_id`),
  KEY `fk_stats_resources1_idx` (`resource_id`),
  KEY `fk_stats_resource_attributes1_idx` (`attribute_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=161 ;

--
-- Дамп данных таблицы `parameter`
--

INSERT INTO `parameter` (`parameter_id`, `value`, `resource_id`, `attribute_id`) VALUES
(103, 10, 96, 7),
(110, 40, 97, 1),
(111, 20, 98, 1),
(112, 15, 99, 4),
(113, 10, 100, 2),
(114, 10, 100, 1),
(121, 40, 102, 1),
(134, 3476, 106, 1),
(139, 1500, 110, 1),
(141, 1234, 113, 2),
(150, 1, 142, 1),
(151, 1, 143, 1),
(152, 1, 144, 1),
(153, 1638, 144, 7),
(154, 95900, 145, 4),
(155, 190000, 145, 1),
(156, 1252, 145, 7),
(157, 58, 146, 2),
(158, 1189, 146, 1),
(159, 112370, 146, 4),
(160, 1366, 146, 7);

-- --------------------------------------------------------

--
-- Структура таблицы `personal_data`
--

CREATE TABLE IF NOT EXISTS `personal_data` (
  `personal_data_id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(40) NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `middle_name` varchar(40) NOT NULL,
  `passport_series` varchar(5) NOT NULL,
  `passport_number` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `registrar_key` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`personal_data_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=124 ;

--
-- Дамп данных таблицы `personal_data`
--

INSERT INTO `personal_data` (`personal_data_id`, `last_name`, `first_name`, `middle_name`, `passport_series`, `passport_number`, `address`, `registrar_key`) VALUES
(1, 'Miekh', 'Dmytro', 'Uriyovich', 'NM', '123456', 'Lviv', '804:23:17:026:'),
(2, 'Miekh2', 'Dmytro2', 'Uriyovich2', 'NM2', '123451', 'Lvi2', '804:23:17:026:'),
(41, 'd', 'd', 'd', 'dd', '11111', 'd', NULL),
(43, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(44, 'Aaa', 'Aaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(45, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(53, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(58, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(60, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(61, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(64, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(65, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(67, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '11111', 'Aaaa', NULL),
(68, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(69, 'Bbbbb', 'Bbbbb', 'Bbbb', 'AA', '111112', 'Bbbbb', NULL),
(70, 'name', 'name', 'name', 'AA', '77777', 'lviv', NULL),
(71, 'Baaa', 'Aaaa', 'Aaaa', 'CC', '222222', 'Aaaa', NULL),
(72, 'Bfff', 'Bfff', 'Bfff', 'DD', '333333', 'Bfff', NULL),
(73, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(74, 'Aaaa', 'Aaaa', 'Aaaa', 'AA', '111111', 'Aaaa', NULL),
(75, 'Aaa123', 'Aaa123', 'Aaa123', 'AA', '11111', 'Aaa123', NULL),
(94, 'test36', 'test36', 'test36', 'TE', '123456', 'test36', NULL),
(97, 'test37', 'test37', 'test37', 'TE', '56565', 'test37', NULL),
(98, 'test37', 'test37', 'test37', 'TE', '56565', 'test37', NULL),
(101, 'test37', 'test37', 'test37', 'TE', '56565', 'test37', NULL),
(102, 'jhgjhgj', 'jhgjghjgh', 'ghfghf', 'kh', 'khkuh', 'kuhkuh', NULL),
(103, 'jhgjhgj', 'jhgjghjgh', 'ghfghf', 'kh', 'khkuh', 'kuhkuh', NULL),
(104, 'jhgjhgj', 'jhgjghjgh', 'ghfghf', 'kh', 'khkuh', 'kuhkuh', NULL),
(105, 'jhgjhgj', 'jhgjghjgh', 'ghfghf', 'kh', 'khkuh', 'kuhkuh', NULL),
(106, 'jhgjhgj', 'jhgjghjgh', 'ghfghf', 'kh', 'khkuh', 'kuhkuh', NULL),
(107, 'Петров', 'Василий', 'Петрович', 'КН', '374826374', 'Виговського 67', NULL),
(108, 'Петров', 'Василий', 'Петрович', 'КН', '374826374', 'Виговського 67', NULL),
(109, 'gfbgf', 'grgrk', 'knklbrt', 'tg', 'bgbg', 'bgbg', NULL),
(111, 'Шевчук', 'Віталій', 'Сергійович', 'КС', '123456', 'Адреса', NULL),
(112, 'Петров', 'Иван', 'Иванович', 'КС', '34536574', 'виговського 7', NULL),
(113, 'Петренко', 'Петро', 'Петрович', 'EE', '123456', '29000, м. Хмельницький, вул. Героїв Майдану, 17, кв. 17', '800:'),
(114, 'last', 'first', 'midl', 'ME', '55555', 'Lv', '804:23:17:026:'),
(115, 'Koval', 'Ivan', 'Ivanovich', 'ME', '55555', 'Ukraine', NULL),
(116, 'Koval', 'Petrovich', 'Ivan', 'ME', '55555', 'LVIV', NULL),
(117, 'Koval', 'P', 'P', 'KA', '77777', 'Addr', NULL),
(118, 'P', 'P', 'E', 'DD', '33333', 's', NULL),
(119, 'P', 'Psd', 'E', 'DD', '33333', 's', NULL),
(120, 'P', 'Psd', 'E', 'DD', '33333', 's', NULL),
(121, 'P', 'Psd', 'E', 'DD', '33333', 's', NULL),
(122, 'Грабар', 'Роман', 'Іванович', 'МЕ', '53273', 'м.Самбір., Шухевича 53', NULL),
(123, 'Васильєв', 'Володимир', 'Володимирович', 'МЕ', '12345', 'Дніпропетровськ вул, Червоний камінь', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `resource`
--

CREATE TABLE IF NOT EXISTS `resource` (
  `resource_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `class_id` int(11) NOT NULL,
  `coordinates` text NOT NULL,
  `owner_data_id` int(11) DEFAULT NULL,
  `reason` text NOT NULL,
  `date` date DEFAULT NULL,
  `registrar_data_id` int(11) DEFAULT NULL COMMENT 'Для контролювання особи дії над ресурсом',
  `registration_number` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`resource_id`),
  KEY `fk_resource_resource_class1_idx` (`class_id`),
  KEY `fk_resource_personal_data1_idx` (`owner_data_id`),
  KEY `registrar_data_id` (`registrar_data_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=147 ;

--
-- Дамп данных таблицы `resource`
--

INSERT INTO `resource` (`resource_id`, `name`, `class_id`, `coordinates`, `owner_data_id`, `reason`, `date`, `registrar_data_id`, `registration_number`) VALUES
(96, 'Митрополивчі сад', 3, '[[49.9039,23.7066],[49.9055,23.7364],[49.8948,23.7289],[49.8945,23.7024]]', NULL, '', '2015-10-11', 113, '1'),
(97, 'Піскові Озера Старі', 3, '[[49.7848,24.1025],[49.7883,24.1402],[49.7697,24.1334],[49.7799,24.1011]]', NULL, '', NULL, 113, '2'),
(98, 'Шевченківський гай', 3, '[[49.8247,24.1069],[49.816,24.1235],[49.8309,24.1247],[49.8328,24.0957]]', NULL, '', NULL, NULL, NULL),
(99, 'Самбір', 1, '[[49.8415,24.0302],[49.8423,24.0302],[49.8423,24.0325],[49.8415,24.0325]]', NULL, '', NULL, NULL, NULL),
(100, 'Стрий', 2, '[[49.8415,24.0302],[49.8423,24.0302],[49.8423,24.0325],[49.8415,24.0325]]', NULL, '', NULL, NULL, NULL),
(102, 'Левандівське озеро', 5, '[[49.844,24.0848],[49.8484,24.0848],[49.8484,24.0966],[49.844,24.0966]]', NULL, '', NULL, NULL, NULL),
(106, 'Парк Івана Франка', 1, '[[49.8441,24.0234],[49.8444,24.0284],[49.8439,24.0313],[49.8425,24.0321],[49.8416,24.0313],[49.8409,24.0278],[49.8417,24.0226]]', 111, '', NULL, NULL, NULL),
(110, 'парк Зелений гай', 1, '', NULL, 'Довірена особа', NULL, NULL, NULL),
(111, 'Будинок меблів', 1, '[[49.8445,23.9711],[49.8483,23.9711],[49.8483,23.9891],[49.8445,23.9891]]', NULL, 'Оренда приміщення', '2015-10-04', NULL, NULL),
(113, 'Шведське озеро', 2, '[[49.8445,23.9711],[49.8483,23.9711],[49.8483,23.9891],[49.8445,23.9891]]', NULL, 'Озеро', '2015-10-06', NULL, NULL),
(142, 'TESTRNAME', 1, '', NULL, 'паспорт громадянина України   ,виданий на ім''я    ', '2015-10-29', 113, NULL),
(143, 'TESTRNAME', 1, '', 116, 'паспорт громадянина України ME 55555 ,виданий на ім''я Koval Ivan Chmelnich 2015-10-13', '2015-10-29', 113, NULL),
(144, 'PPPp', 1, '[[49.8395,24.0197],[49.8437,24.0197],[49.8437,24.0246],[49.8395,24.0246]]', 121, 'паспорт громадянина України DD 33333 ,виданий на ім''я P E s 2015-10-29', '2015-10-29', 113, 'q'),
(145, 'Моя Україна', 1, '[[49.8399,24.0218],[49.8423,24.0218],[49.8423,24.0268],[49.8399,24.0268]]', 122, 'паспорт громадянина України МЕ 53273 ,виданий на ім''я Грабар Іванович Самбірським МВС, у Львівській обл., 2000-08-15\nДодаткова підстава', '2015-10-30', 113, 'е23'),
(146, 'КНР', 7, '[[49.8382,24.0161],[49.8408,24.0211],[49.8395,24.0226],[49.8392,24.0223],[49.8386,24.0227],[49.8367,24.0193],[49.8369,24.0183]]', 123, 'паспорт громадянина України МЕ 12345 ,виданий на ім''я Васильєв Володимирович Дніпропетровським ОМД 1988-04-01', '2014-11-01', 113, 'єє');

-- --------------------------------------------------------

--
-- Структура таблицы `resource_attribute`
--

CREATE TABLE IF NOT EXISTS `resource_attribute` (
  `attribute_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  PRIMARY KEY (`attribute_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `resource_attribute`
--

INSERT INTO `resource_attribute` (`attribute_id`, `name`) VALUES
(1, 'length'),
(2, 'width'),
(3, 'height'),
(4, 'square'),
(5, 'volume'),
(6, 'weight'),
(7, 'perimeter');

-- --------------------------------------------------------

--
-- Структура таблицы `resource_class`
--

CREATE TABLE IF NOT EXISTS `resource_class` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Дамп данных таблицы `resource_class`
--

INSERT INTO `resource_class` (`class_id`, `name`) VALUES
(1, 'земельні ресурси'),
(2, 'водні ресурси'),
(3, 'надра'),
(4, 'клімат'),
(5, 'повітряний простір'),
(6, 'атмосферні ресурси'),
(7, 'радіочастотний ресурс'),
(8, 'фауна '),
(9, 'флора '),
(10, 'альтернативні джерела енергії');

-- --------------------------------------------------------

--
-- Структура таблицы `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `role`
--

INSERT INTO `role` (`role_id`, `name`) VALUES
(1, 'user'),
(2, 'registrar'),
(3, 'admin');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `auth_key` varchar(32) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `user_data_id` int(11) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`user_data_id`),
  KEY `role_id_2` (`role_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`user_id`, `username`, `auth_key`, `password_hash`, `password_reset_token`, `email`, `user_data_id`, `role_id`) VALUES
(1, 'demo', 'mPLobHQJkMV7pdw6JM5azks9n-Fkx9EY', '$2y$13$BlX7rTSKcUaluomULVXgRec/1H.y2yJG.K7jSXZArCq4OkzhJ9S/y', NULL, 'demo@mail.net', 1, 3),
(3, 'mof', 'pdw6JM5azks9n-Fkx9EYmPLobHQJkMV7', '$2y$13$XSNOyLiil07pBhh5RnNsxuHsvr21cO3HoqGtMs9rPe4xGr2L.RdUu', 'F7NFSAPun1hooVGJGpUGgaUpPcJ4iEEu_1444824168', 'zhenyast@yandex.ru', 2, 2),
(7, 'mof2', 'sBZlLkpEbikELmURWCopgN-lYiqU7UYu', '$2y$13$yLUJbUf98IMuPBuGO2lkwu87KYF0lJM.q0s8cA2wvNxOyPCT1p/92', NULL, 'zhenyast@yandex.ru', 1, 3),
(8, 'mof23', 'LTrS-nd6GOp4NAuWsqLPMGRmTXyhnRoR', '$2y$13$Ttwe62ORjJUriGFQoT9jkeFwzaQjXlAMEmPtKiy7JYbbjEmCf09V2', NULL, 'test@gmail.com', 1, 1),
(9, 'mof234', 'v0HLQsttxqamwDDszxTmGrio0KjVFASu', '$2y$13$sVfWSaKYBjCXRG.ipdGnBOG7IWZ5epKuRxcj43I.5TLlWaxU1Tfiq', NULL, 'test@gmail.com', 1, 1),
(10, 'mof4', 'nzns3KZbmVNEERTeqbyWSmiA8iIsZCuy', '$2y$13$x4P0BcqVrFjVSE8tVfbaZuFEHpwX9Llt6MEDWtpT3H35m/35I7xhq', NULL, 'test@gmail.com', 1, 1),
(11, 'mof5', 'D3Hwd61ihElNoSZqYdbm6tY7MiR9TKMN', '$2y$13$apiaxjG5M3k1MQ/IdxYM1ubbyaOglIdNoOymvuzkITKShbqhP.EW6', NULL, 'test@gmail.com', 1, 1),
(12, 'mof6', 'FEdVtOX6YBUSBDkGwBmlkRs7MvKS1rNS', '$2y$13$UW1VZ9hHTX5Vhnzw.uoQ7OUMu/GInWxGUN8CKFqE11hHkyE0VQuxe', NULL, 'test@gmail.com', 1, 1),
(14, 'mof9', 'CnJoAGaGgNUzWFs1douSRUhI-7nCQofg', '$2y$13$NGtRJrUMsGHIrqrKdWq2kercGlmyyjwOgpm8ZxYfSey6Y0Gk0Dtfu', NULL, 'test@gmail.com', 1, 1),
(15, 'mof10', 'iWVndxR_sQaVRTNgvgKNsgLlJB1pNzDk', '$2y$13$GyFd0cLsWEqsoY31QSynBexJhzntmrB6yGu.Tk2kTsSsq09uybWwC', NULL, 'test@gmail.com', 2, 1),
(16, 'mof11', 'J9pL0T5YDbPSK7mn0O0FRYndbFFxAgEX', '$2y$13$O4Hid6PLW2BGi.Y4IlX2c.XBVWk.SPul8pWrD6XgYxxQgRXtRHdpC', NULL, 'test@gmail.com', 2, 1),
(17, 'mof12', '2b1-_u4Gb-BcDIlQTwwxOFSXypfeLuMP', '$2y$13$ffgOz/IhD8Jb2r0vX/Z44uA9u0QP2aRDlxdxokeVdK18z76yPo7RO', NULL, 'personalDataModel@ya.ru', 2, 1),
(18, 'mof17', 'ecuUkIjIbI-a_JL3dk5clnLTBu6NMPxm', '$2y$13$Wqc8FH7coO.n/iyc/l4nHecWTJlQQujSFcnBeX1n7MhwmcsvPZ00m', NULL, 'test@mail.ru', 2, 1),
(20, 'mof18', 'vLNM1wxWKgQN27Ggot6mt2i08QxEI1dk', '$2y$13$LcGAfRrqIZDUwtdECiOKreh5XUAL106odA5Zj89sd034r3WJxdvBe', NULL, 'vasya@ya.ru', 2, 1),
(21, 'test36', 'ucDnNXLbL4cqo6EEezyEeUoC37NuU47n', '$2y$13$g00nLVE8.hcc1yAXCJeO.uzaTouLi4QxGh0YSDP8WMFnxKovaMEWO', NULL, 'test36@mail.ru', 94, 1),
(22, 'test37', '0hRs_b4To10q9QejQ3wS0ATzNMUKmSHy', '$2y$13$27YSO6O3fFH62.S2hIPWHuwuYzVyMfLx1iVex.oB5oJKvrd2I.Gfa', NULL, 'test37@mail.ru', 97, 1),
(23, 'test38', 'eJWSGRi2nyz9wPviMJw0lH1ixy5IrtMi', '$2y$13$54dopM1dbO6totckC8dtF.akY7Wr6XBWBx47KFU/rUm2cjt6HvmSO', NULL, 'vitashev@bk.ru', 98, 1),
(24, 'test385', 'ODBf-XUPupYGk4iss935XhIECg-nbwok', '$2y$13$xaKAJKmtQveX.TAIYmBun.PY60neU.6v1cfKz2Ujq59B/Bne3ZE/G', NULL, 'rerse@ya.ri', 101, 1),
(25, 'user4', 'VYNlikVL5ZSiCPZp3XL6NZ_nr4cl9Pr3', '$2y$13$ZXQ6T/TwSILVwPqTvPU3.uour0NolMMiVxE0jtuXAknR9hW7jieue', NULL, 'registerresource@gmail.com', 107, 2),
(26, 'user5', 'AE5fW3PCbNY3D5jGAtAiAGXd0ezMdy-q', '$2y$13$KuiNKwLYUfFdmvzfDhrBiuhiPADovcohyE72peEoaven2EsohU2wK', NULL, 'registerresource@gmail.com', 108, 2),
(27, 'grgrgrt', 'Fxl0xfdMGVrzpPj8c1_uNtAwAAf5t90T', '$2y$13$pddF4JoxuVGVm.gVWl.KJ.HpBYzvE4s4Fbwv9CUJUqHUzMgu3gF8.', NULL, 'gtrgrt@ya.ru', 109, 2),
(28, 'username1', 'kq1OSpQweIhZ3kfF5f6fAM2_kM9H5h3E', '$2y$13$EDFwkXrlujw3YdzlOG708up.2piJ5aN8sduhaTKYF0tpeeFiQ2Iqu', NULL, 'registerresource@gmail.com', 112, 2),
(29, 'registrar', 'nh1R7g-MHLNcBOFuP_Jn8N0q_9E3K50z', '$2y$13$/qKMqvRxreJoaI2Zpqee2.TjYGI57vsSbkzGOAZSYUp.DyoerZrEO', NULL, 'test69@mail.ru', 113, 2),
(30, 'gith', 'r9ZSVEms7lozWO7Guo_K3ZiyaxRyQD3M', '$2y$13$/01guLVgaBoUExQTjJiCH.yOgoyIje7RWjsC3Iis1iQaevJxiEZMG', NULL, 'gith@gmail.com', 114, 2);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `attribute_class_view`
--
ALTER TABLE `attribute_class_view`
  ADD CONSTRAINT `fk_attribute_class_view_resource_attribute1` FOREIGN KEY (`attribute_id`) REFERENCES `resource_attribute` (`attribute_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_attribute_class_view_resource_class1` FOREIGN KEY (`class_id`) REFERENCES `resource_class` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `operation`
--
ALTER TABLE `operation`
  ADD CONSTRAINT `fk_transactions_transaction_type1` FOREIGN KEY (`type_id`) REFERENCES `operation_type` (`type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `parameter`
--
ALTER TABLE `parameter`
  ADD CONSTRAINT `fk_stats_resources1` FOREIGN KEY (`resource_id`) REFERENCES `resource` (`resource_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_stats_resource_attributes1` FOREIGN KEY (`attribute_id`) REFERENCES `resource_attribute` (`attribute_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `resource`
--
ALTER TABLE `resource`
  ADD CONSTRAINT `fk_resource_personal_data1` FOREIGN KEY (`owner_data_id`) REFERENCES `personal_data` (`personal_data_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_resource_resource_class1` FOREIGN KEY (`class_id`) REFERENCES `resource_class` (`class_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`user_data_id`) REFERENCES `personal_data` (`personal_data_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
