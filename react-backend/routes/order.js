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

    if (id == null) {
        res.sendStatus(404);
        return;
    }

    db.query('SELECT product.id, name, stock, weigth, alley, shelf, level, block, alert, isDeleted' +
     ' FROM ' + TABLE_ORDERITEM + ' RIGHT JOIN product ON orderitem.idProduct=product.id WHERE idOrder=?', [id], function (err, result) {
        res.send(result)
    }).on('error', function (err) {
        console.log("[mysql error]", err);
    });
});


module.exports = router;