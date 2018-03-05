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
    ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Date date,
    Flag INT
);

CREATE TABLE `OrderItem`
(
    ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    IDOrder INT,
    IDProduct INT,
    Quantity INT
);

CREATE TABLE `OrderPick`
(
    IDPicking INT,
    IDOrder INT,
    Flag INT
);

CREATE TABLE `Picking`
(
    ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    IDUserPicker INT,
    Flag INT
);

CREATE TABLE `Product`
(
    ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Name VARCHAR(500),
    Stock INT,
    Weight FLOAT,
    Alley CHAR,
    Shelf INT,
    Level INT,
    Block INT,
    Alert INT,
    Flag INT
);

ALTER TABLE `OrderItem`
ADD FOREIGN KEY (IDOrder) REFERENCES `Order`(ID);

ALTER TABLE `OrderItem`
ADD FOREIGN KEY (IDProduct) REFERENCES `Product`(ID);


ALTER TABLE `OrderPick`
ADD FOREIGN KEY (IDOrder) REFERENCES `Order`(ID);

ALTER TABLE `OrderPick`
ADD FOREIGN KEY (IDPicking) REFERENCES `Picking`(ID);

INSERT INTO `Product` (ID, Name, Stock, Weight, Alley, Shelf, Level, Block, Alert, Flag)
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

INSERT INTO  `Product` (ID, Name, Stock, Weight, Alley, Shelf, Level, Block, Alert, Flag)
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

INSERT INTO `Product` (ID, Name, Stock, Weight, Alley, Shelf, Level, Block, Alert, Flag)
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
        
INSERT INTO `Order` (ID, Flag)
VALUES (1, 1);

INSERT INTO `OrderItem` (IDOrder, IDProduct, Quantity)
VALUES (1, 1, 2);
INSERT INTO `OrderItem` (IDOrder, IDProduct, Quantity)
VALUES (1, 2, 2);
INSERT INTO `OrderItem` (IDOrder, IDProduct, Quantity)
VALUES (1, 3, 4);



