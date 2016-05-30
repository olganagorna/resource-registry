-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 30, 2016 at 05:32 PM
-- Server version: 5.5.47-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `resource_registry`
--

-- --------------------------------------------------------

--
-- Table structure for table `resource_attribute`
--

CREATE TABLE IF NOT EXISTS `resource_attribute` (
  `attribute_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `is_global` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`attribute_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `resource_attribute`
--

INSERT INTO `resource_attribute` (`attribute_id`, `name`, `is_global`) VALUES
(1, 'Довжина', 1),
(2, 'Ширина', 1),
(3, 'Висота', 1),
(4, 'Площа', 1),
(5, 'Об''єм', 1),
(6, 'Масса', 1),
(7, 'Периметр', 1),
(8, 'Глибина', 0),
(9, 'глибина заляганнь', 0),
(10, 'Кліматична зона', 0),
(11, 'Температура', 0),
(12, 'Вологість', 0),
(13, 'Кількість', 0),
(14, 'wwrtewtre', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
