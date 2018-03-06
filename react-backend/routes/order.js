var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser')

const TABLE_ORDER = '`order`';
const TABLE_ORDERITEM = 'orderitem';

router.get('/', function (req, res, next) {

    db.query('SELECT * FROM ' + TABLE_ORDER, function (err, result) {
        res.send(result)
    }).on('error', function (err) {
        console.log("[mysql error]", err);
    });
});

router.get('/:id', function (req, res, next) {
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
    var id = req.params.id;
    //  result[0]['id'] = { "nested1" : "lol", "nested2" : "lol2"};
    if (id == null) {
        res.sendStatus(404);
        return;
    }

    
    db.query('SELECT * FROM ' + TABLE_ORDERITEM + ' WHERE idorder=?', [id], function (err, orderRows) {
        for (var i = 0; i < orderRows.length; i++) {
            db.query('SELECT * FROM  product WHERE id=?', orderRows[i]['idProduct'], function (err, product) {
                orderRows[i]['id'] = 300;
            }).on('error', function (err) {
                console.log("[mysql error]", err);
            });
        }
        res.send(orderRows);
    }).on('error', function (err) {
            console.log("[mysql error]", err);
    });
});


module.exports = router;