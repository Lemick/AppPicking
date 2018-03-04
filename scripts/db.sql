DROP TABLE IF EXISTS UserPicker;

CREATE TABLE IF NOT EXISTS `UserPicker` (
  `id` int(6) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `health` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

INSERT INTO `UserPicker` (`id`, `name`, `surname`, `health`) VALUES
  (1, 'John', 'Doe', 60),
  (2, 'Geralt', 'Wyzima', 90),
  (3, 'Nataly', 'Parker', 20),
  (4, 'Steven', 'Cain', 30),
  (5, 'Linda', 'Hanston', 50);