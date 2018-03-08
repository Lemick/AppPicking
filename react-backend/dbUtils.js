var db = require('./db');
var async = require('async');


const TABLE_ORDER = '`order`';
const TABLE_ORDERITEM = 'orderitem';

/************************
 * FETCH METHODS
 ************************/
module.exports = {
    getOrders: function (removeProcessed, orderByDate, _callback) {

        var removeProcessedClause = ''
        if (removeProcessed)
            var removeProcessedClause = ' WHERE isProcessed=0 ';

        var orderByDateClause = ''
        if (orderByDate == 'asc')
            orderByDateClause = ' ORDER BY date ASC ';
        else if (orderByDate == 'desc')
            orderByDateClause = ' ORDER BY date DESC ';

        // Fetch Orders
        db.query('SELECT * FROM ' + TABLE_ORDER + removeProcessedClause + orderByDateClause, function (err, orders) {
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
            if (resPicking.affectedRows > 0) {
                var sqlOrderPickValues = '';
                for (var i = 0; i < idsOrder.length; i++) {
                    sqlOrderPickValues += '(' + resPicking.insertId + ',' + idsOrder[i] + ')';
                    if (i < idsOrder.length-1)
                        sqlOrderPickValues += ',';
                }
                console.log(sqlOrderPick + sqlOrderPickValues);
                db.query(sqlOrderPick + sqlOrderPickValues, function (err, resOrdPick) {
                    if (resOrdPick.affectedRows > 0) {
                        _callback(resPicking.insertId);
                    } else {
                        console.log("[mysql error]", err);
                        _callback(null);
                    }
                });
            } else {
                console.log("[mysql error]", err);
                _callback(null);
            }
        });
    }
};