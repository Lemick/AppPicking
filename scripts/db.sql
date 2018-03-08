DROP TABLE IF EXISTS `UserPicker`;
DROP TABLE IF EXISTS `OrderItem`;
DROP TABLE IF EXISTS `OrderPick`;
DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS `Picking`;
DROP TABLE IF EXISTS `Product`;
DROP TABLE IF EXISTS `Alert`;

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
    date DATETIME
);

CREATE TABLE `OrderItem`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idOrder INT,
    idProduct INT,
    quantity INT,
    quantityPicked INT DEFAULT 0
);

CREATE TABLE `OrderPick`
(
    idPicking INT, 
    idOrder INT,
    PRIMARY KEY(idOrder, idPicking)
);

CREATE TABLE `Picking`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    idUserPicker INT,
    isFinished INT DEFAULT 0
);

CREATE TABLE `Product`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(500),
    stock INT,
    weight FLOAT,
    alley CHAR,
    shelf INT,
    level INT,
    block INT
);

CREATE TABLE `Alert`
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    creationTime      DATETIME DEFAULT   CURRENT_TIMESTAMP,
    modificationTime  DATETIME ON UPDATE CURRENT_TIMESTAMP,
    idProduct INT,
    idUserPicker INT,
    isHandled INT DEFAULT 0
);

ALTER TABLE `OrderItem`
ADD FOREIGN KEY (idOrder) REFERENCES `Order`(id);

ALTER TABLE `OrderItem`
ADD FOREIGN KEY (idProduct) REFERENCES `Product`(id);


ALTER TABLE `OrderPick`
ADD FOREIGN KEY (idOrder) REFERENCES `Order`(id);

ALTER TABLE `OrderPick`
ADD FOREIGN KEY (idPicking) REFERENCES `Picking`(id);


ALTER TABLE `Alert`
ADD FOREIGN KEY (idProduct) REFERENCES `Product`(id);

ALTER TABLE `Alert`
ADD FOREIGN KEY (idUserPicker) REFERENCES `UserPicker`(id);

/*******************************
*   INSERT INTO PRODUCTS
*
********************************/
INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (1, 'Stylo vert', 100, 0.1, 'A', 4, 6, 8);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (2, 'Stylo bleu', 100, 0.1, 'B', 5, 8, 10);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (3, 'Stylo rouge', 100, 0.1, 'C', 6, 1, 4);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (4, 'Dechiqueteuse à papier', 100, 20, 'F', 2, 4, 5);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (5, 'TV Phillips HD201', 100, 28, 'D', 2, 1, 4);


/*******************************
*   INSERT INTO USERPICKER
*
********************************/
INSERT INTO `UserPicker` (`id`, `name`, `surname`, `health`) VALUES
  (1, 'John', 'Doe', 60),
  (2, 'Geralt', 'Wyzima', 90),
  (3, 'Nataly', 'Parker', 20),
  (4, 'Steven', 'Cain', 30),
  (5, 'Linda', 'Hanston', 50);
        


/*******************************
*   INSERT INTO ORDER
*
********************************/

INSERT INTO `Order` (id, date) VALUES (1, NOW() + INTERVAL 1 HOUR);
INSERT INTO `Order` (id, date) VALUES (2, NOW() + INTERVAL 2 HOUR);
INSERT INTO `Order` (id, date) VALUES (3, NOW() + INTERVAL 3 HOUR);

/*******************************
*   INSERT INTO ORDERITEM
*
********************************/
INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (1, 1, 2);
INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (1, 2, 2);
INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (1, 3, 4);

INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (2, 4, 2);

INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (3, 5, 3);

/*******************************
*   INSERT INTO PICKING
*
********************************/

INSERT INTO `Picking` (id, idUserPicker, isFinished) VALUES (1, 1, 1);
INSERT INTO `Picking` (id, idUserPicker, isFinished) VALUES (2, 3, 0);

/*******************************
*   INSERT INTO ORDER PICK
*
********************************/

INSERT INTO `OrderPick` (idPicking, idOrder) VALUES (1, 1);
INSERT INTO `OrderPick` (idPicking, idOrder) VALUES (2, 3);


/*******************************
*   INSERT INTO ALERTS
*
********************************/

INSERT INTO `Alert` (idProduct, idUserPicker) VALUES (2, 1);
INSERT INTO `Alert` (idProduct, idUserPicker) VALUES (4, 1);
INSERT INTO `Alert` (idProduct, idUserPicker) VALUES (2, 2);


