var db = require('./db');
var async = require('async');


const TABLE_ORDER = '`order`';
const TABLE_ORDERITEM = 'orderitem';


module.exports = {
    getOrders: function (removeProcessed, orderByDate, _callback) {

        /**
         * On modifie la requête SQL si l'on ne veut pas des commandes déja totalement traitées
         * (i.e : dont tout les produits on été 'pické' dans la quantité demandé)
         * Les commandes traitées 'partiellement' car le stock n'était pas suffisant peuvent donc être gérées et réaffecté à un picker.
         */
        var removeProcessedWhereClause = ''
        var removeProcessedJoinClause = ''
        var removeProcessedGroupClause = ''
        if (removeProcessed) {
            removeProcessedJoinClause = ' LEFT JOIN orderitem ON order.id = orderitem.idOrder ';
            removeProcessedWhereClause = ' WHERE quantity != quantityPicked AND order.id NOT IN (SELECT orderpick.idOrder FROM orderpick) ';
            removeProcessedGroupClause = ' GROUP BY order.id '
        }
            
        var orderByDateClause = ''
        if (orderByDate == 'asc')
            orderByDateClause = ' ORDER BY date ASC ';
        else if (orderByDate == 'desc')
            orderByDateClause = ' ORDER BY date DESC ';

        // Fetch Orders
        db.query('SELECT order.id, order.date FROM ' + TABLE_ORDER + removeProcessedJoinClause + removeProcessedWhereClause + removeProcessedGroupClause + orderByDateClause, 
        function (err, orders) {
            console.log('SELECT order.id, order.date FROM ' + TABLE_ORDER + removeProcessedJoinClause + removeProcessedWhereClause + removeProcessedGroupClause + orderByDateClause);
            async.forEachOf(orders, function (order, i, callbackOrder) {
                // Fetch OrderItems
                db.query('SELECT * FROM orderitem WHERE idorder=?', order['id'], function (err, orderItems) {
                    order['orderItem'] = orderItems;
                    async.forEachOf(orderItems, function (orderItem, i, callbackOrderItem) {
                        // Fetch Product
                        db.query('SELECT * FROM  product WHERE id=?', orderItem['idProduct'], function (err, product) {
                            orderItem['product'] = product[0];
                            callbackOrderItem();
                        }).on('error', function (err) {
                            console.log("[mysql error]", err);
                        });
                    }, callbackOrder);

                }).on('error', function (err) {
                    console.log("[mysql error]", err);
                });
            }, function (err) {
                if (err) {
                    console.err(err);
                    return null;
                } else {
                    _callback(orders)
                }
            });
        }).on('error', function (err) {
            console.log("[mysql error]", err);
        });

    },
    /**
     * Insére un nouveau picking pour un user et les OrderPicking associés à celui ci
     * TODO : Transaction pourrait être interessante ici
     */
    insertPicking: function (idUser, idsOrder, _callback) {
        sqlPicking = 'INSERT INTO `picking` (`idUserPicker`) VALUES (?)';
        sqlOrderPick = 'INSERT INTO `orderpick`(`idPicking`, `idOrder`) VALUES ';

        db.query(sqlPicking, [idUser], function (err, resPicking) {
            console.log(sqlPicking + ' param = ' + idUser);
            if (resPicking.affectedRows > 0) {
                var sqlOrderPickValues = '';
                for (var i = 0; i < idsOrder.length; i++) {
                    sqlOrderPickValues += '(' + resPicking.insertId + ',' + idsOrder[i] + ')';
                    if (i < idsOrder.length - 1)
                        sqlOrderPickValues += ',';
                }
                console.log(sqlOrderPick + sqlOrderPickValues);
                db.query(sqlOrderPick + sqlOrderPickValues, function (err, resOrdPick) {
                    console.log(resOrdPick);
                    if (resOrdPick.affectedRows > 0) {
                        _callback(resPicking.insertId);
                    } else {
                        console.log("**1 [mysql error]", err);
                        _callback(null);
                    }
                }).on('error', function (err) {
                    console.log("**2 [mysql error]", err);
                });
            } else {
                console.log("**3 [mysql error]", err);
                _callback(null);
            }
        }).on('error', function (err) {
            console.log("**4 [mysql error]", err);
        });
    },

    getAllUsersPicker: function (_callback) {
        db.query('SELECT * FROM userPicker', function (err, users) {
            _callback(users);
        }).on('error', function (err) {
            console.log("[mysql error]", err);
        });
    },

    insertAlert : function (idProduct, idUserPicker, _callback) {
        sqlinsertAlert = 'INSERT INTO `alert`(`idProduct`, `idUserPicker`) VALUES ( ?, ?)';
        db.query(sqlinsertAlert, [idProduct, idUserPicker], function (err, alert) {
            if (alert.affectedRows > 0) {
                _callback(alert.insertId);
            } else {
                console.log("[mysql error]", err);
                _callback(null);
            }
        }).on('error', function (err) {
            console.log("[mysql error]", err);
        });
    },

    /**
     * Renvoie 1 si la commande est déja liée à un picking, sinon 0
     * TODO : on pourra ici verifier plus précisement si la commande est lié à un picking Terminé, 
     * dans quel cas on pourra potentiellement le réassigner (cas d'une commande incompléte)
     */
    orderAlreadyAssignedToPicking(idOrder, _callback) {
        let sqlQuery = 'CASE WHEN EXISTS ( SELECT * FROM `orderpick` WHERE orderpick.idOrder = ' + idOrder + ') THEN 1 ELSE 0 END' // On à pas accés aux ALIAS dans cette requête
        let select = ' SELECT ';
        db.query(select + sqlQuery, function (err, result) {
            console.log('restult select case pour id order ' + idOrder);
            console.log(select + sqlQuery + ' ' + idOrder);
            console.log(result[0][sqlQuery]);
            _callback(result[0][sqlQuery] == 1);
        }).on('error', function (err) {
            console.log("[mysql error]", err);
        });
    },

    updatePickingStatus : function (idPicking, _callback) {
        sqlupdate = 'UPDATE picking SET isFinished=1 WHERE id=?';
        db.query(sqlupdate, [idPicking], function (err, pickingUpdated) {
            if (pickingUpdated.affectedRows > 0) {
                _callback(true);
            } else {
                console.log("[mysql error]", err);
                _callback(null);
            }
        }).on('error', function (err) {
            console.log("[mysql error]", err);
        });
    },

    updateQuantityPicked : function (idOrderItem, quantityPicked, _callback) {
        sqlupdate = 'UPDATE orderitem SET quantityPicked=? WHERE id=?';
        db.query(sqlupdate, [quantityPicked, idOrderItem], function (err, res) {
            if (res.affectedRows > 0) {
                _callback(true);
            } else {
                console.log("[mysql error]", err);
                _callback(null);
            }
        }).on('error', function (err) {
            console.log("[mysql error]", err);
        });
    },

};