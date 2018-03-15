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
    alley INT,
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
VALUES (1, 'Stylo vert', 87, 0.1, 1, 4, 6, 8);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (2, 'Stylo bleu', 130, 0.1, 1, 5, 8, 10);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (3, 'Stylo rouge', 122, 0.1, 2, 6, 1, 4);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (4, 'Dechiqueteuse à papier', 23, 20, 2, 2, 4, 5);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (5, 'TV Phillips HD201', 17, 28, 3, 2, 1, 4);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (6, 'TV 4K Philips U21', 6, 20, 4, 10, 4, 3);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (7, 'Agraffeuse', 150, 0.3, 2, 2, 4, 5);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (8, 'Aggrafes x50', 146, 0.2, 3, 1, 2, 5);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (9, 'Chaise de bureau Confortex', 36, 8, 5, 6, 2, 8);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (10, 'Chaise de bureau Premium', 3, 17, 2, 6, 2, 3);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (11, 'Etagère classeur', 3, 60, 1, 8, 7, 7);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (12, 'Classeurs x5', 78, 2, 4, 3, 2, 4);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (13, 'Bureau standard chênex', 6, 80, 5, 8, 8, 4);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (20, 'Meuble de jardin', 5, 15, 8, 8, 8, 4);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (21, 'Fontaine de jardin', 6, 10, 10, 9, 7, 4);

INSERT INTO `Product` (id, name, stock, weight, alley, shelf, level, block)
VALUES (22, 'Boîte à outil de jardin', 6, 3, 8, 7, 6, 4);


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
INSERT INTO `Order` (id, date) VALUES (4, NOW() + INTERVAL 4 HOUR);
INSERT INTO `Order` (id, date) VALUES (5, NOW() + INTERVAL 5 HOUR);
INSERT INTO `Order` (id, date) VALUES (10, NOW() + INTERVAL 10 HOUR);
INSERT INTO `Order` (id, date) VALUES (11, NOW() + INTERVAL 11 HOUR);

/*******************************
*   INSERT INTO ORDERITEM
*
********************************/
INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (1, 1, 2);
INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (1, 2, 2);
INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (1, 3, 4);

INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (2, 4, 2);

INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (3, 5, 3);

INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (4, 10, 1);
INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (4, 8, 6);
INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (4, 7, 7);

INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (5, 13, 1);


INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (10, 20, 1);
INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (10, 21, 1);

INSERT INTO `OrderItem` (idOrder, idProduct, quantity) VALUES (11, 20, 1);



/*******************************
*   INSERT INTO ORDER PICK
*
********************************/

-- INSERT INTO `OrderPick` (idPicking, idOrder) VALUES (1, 3);

-- INSERT INTO `OrderPick` (idPicking, idOrder) VALUES (2, 1);
-- INSERT INTO `OrderPick` (idPicking, idOrder) VALUES (2, 2);

/*******************************
*   INSERT INTO PICKING
*
********************************/

-- INSERT INTO `Picking` (id, idUserPicker, isFinished) VALUES (1, 1, 1);
-- INSERT INTO `Picking` (id, idUserPicker, isFinished) VALUES (2, 3, 0);


/*******************************
*   INSERT INTO ALERTS
*
********************************/

INSERT INTO `Alert` (idProduct, idUserPicker) VALUES (2, 1);
INSERT INTO `Alert` (idProduct, idUserPicker) VALUES (4, 1);
INSERT INTO `Alert` (idProduct, idUserPicker) VALUES (2, 2);


