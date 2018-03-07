var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var async = require('async');

var db = require('../db');
var dbUtils = require('../dbUtils');

const TABLE_ORDER = '`order`';
const TABLE_ORDERITEM = 'orderitem';

/**
 * Params :
 * removeProcessed = false : Définit si les commandes deja affectées doivent apparaître
 * orderByDate = null : Définit le tri par date de commande
 */
router.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    console.log(req.query.orderByDate);
    var removeProcessed = req.query.removeProcessed == 'true';
    var orderByDate = req.query.orderByDate;

    let orders = dbUtils.getOrders(removeProcessed, orderByDate, function(orders) {
        res.send(orders);
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

    // Fetch Order
    db.query('SELECT * FROM ' + TABLE_ORDERITEM + ' WHERE idorder=?', [id], function (err, rows) {
        async.forEachOf(rows, function (row, i, callback) {
            // Fetch Product
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