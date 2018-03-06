var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser')
var async = require('async');
const TABLE_ORDER = '`order`';
const TABLE_ORDERITEM = 'orderitem';

router.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    db.query('SELECT * FROM ' + TABLE_ORDER, function (err, orders) {

        async.forEachOf(orders, function (order, i, callbackOrder) {
            db.query('SELECT * FROM orderitem WHERE idorder=?', order['id'], function (err, orderItems) {

                order['orderItem'] = orderItems;
                async.forEachOf(orderItems, function (orderItem, i, callbackOrderItem) {
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
                res.sendStatus(500);
            } else {
                // after all the iterations are done
                res.send(orders);
            }
        });
    }).on('error', function (err) {
        console.log("[mysql error]", err);
    });
});

router.get('/:id', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;

    if (id == null) {
        res.sendStatus(404);
        return;
    }

    db.query('SELECT * FROM ' + TABLE_ORDER + ' WHERE id=?', [id], function (err, result) {
        res.send(result)
    }).on('error', function (err) {
        console.log("[mysql error]", err);
    });
});

router.get('/:id/items', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;

    if (id == null) {
        res.sendStatus(404);
        return;
    }

    db.query('SELECT * FROM ' + TABLE_ORDERITEM + ' WHERE idorder=?', [id], function (err, result) {
        res.send(result)
    }).on('error', function (err) {
        console.log("[mysql error]", err);
    });
});

router.get('/:id/products', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;

    if (id == null) {
        res.sendStatus(404);
        return;
    }

    db.query('SELECT * FROM ' + TABLE_ORDERITEM + ' WHERE idorder=?', [id], function (err, rows) {
        async.forEachOf(rows, function (row, i, callback) {
            db.query('SELECT * FROM  product WHERE id=?', row['idProduct'], function (err, product) {
                row['product'] = product[0];
                callback();
            }).on('error', function (err) {
                console.log("[mysql error]", err);
            });
        }, function (err) {
            if (err) {
                console.err(err);
                res.sendStatus(500);
            } else {
                // after all the iterations are done
                res.send(rows);
            }
        });
    }).on('error', function (err) {
        console.log("[mysql error]", err);
    });
});


module.exports = router;