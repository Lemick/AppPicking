DROP TABLE IF EXISTS UserPicker;
DROP TABLE IF EXISTS `OrderItem`;
DROP TABLE IF EXISTS `OrderPick`;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS `Picking`;
DROP TABLE IF EXISTS `Product`;


CREATE TABLE IF NOT EXISTS `UserPicker` (
  `id` int(6) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `health` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

CREATE TABLE `Order`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date date,
    isProcessed INT
);

CREATE TABLE `OrderItem`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idOrder INT,
    idProduct INT,
    quantity INT
);

CREATE TABLE `OrderPick`
(
    idPicking INT,
    idOrder INT,
    isProcessed INT
);

CREATE TABLE `Picking`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idUserPicker INT,
    isProcessed INT
);

CREATE TABLE `Product`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(500),
    stock INT,
    weigth FLOAT,
    alley CHAR,
    shelf INT,
    level INT,
    block INT,
    alert INT,
    isDeleted INT
);

ALTER TABLE `OrderItem`
ADD FOREIGN KEY (idOrder) REFERENCES `Order`(id);

ALTER TABLE `OrderItem`
ADD FOREIGN KEY (idProduct) REFERENCES `Product`(id);


ALTER TABLE `OrderPick`
ADD FOREIGN KEY (idOrder) REFERENCES `Order`(id);

ALTER TABLE `OrderPick`
ADD FOREIGN KEY (idPicking) REFERENCES `Picking`(id);

INSERT INTO `Product` (id, name, stock, weigth, alley, shelf, level, block, alert, isDeleted)
VALUES (1,
        'Stylo vert',
        100,
        0.4,
        'B',
        4,
        6,
        8,
        0,
        1);

INSERT INTO  `Product` (id, name, stock, weigth, alley, shelf, level, block, alert, isDeleted)
VALUES (2,
        'Cable ethernet',
        100,
        0.7,
        'C',
        6,
        9,
        4,
        0,
        1);

INSERT INTO `Product` (id, name, stock, weigth, alley, shelf, level, block, alert, isDeleted)
VALUES (3,
        'HDMI to VGA',
        100,
        0.9,
        'D',
        7,
        2,
        1,
        0,
        1);


INSERT INTO `UserPicker` (`id`, `name`, `surname`, `health`) VALUES
  (1, 'John', 'Doe', 60),
  (2, 'Geralt', 'Wyzima', 90),
  (3, 'Nataly', 'Parker', 20),
  (4, 'Steven', 'Cain', 30),
  (5, 'Linda', 'Hanston', 50);
        
INSERT INTO `Order` (id, isProcessed)
VALUES (1, 1);

INSERT INTO `OrderItem` (idOrder, idProduct, quantity)
VALUES (1, 1, 2);
INSERT INTO `OrderItem` (idOrder, idProduct, quantity)
VALUES (1, 2, 2);
INSERT INTO `OrderItem` (idOrder, idProduct, quantity)
VALUES (1, 3, 4);



