var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser')

router.get('/', function (req, res, next) {
    res.send("picking entry point")
});


router.get('/:id/orderitems', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var id = req.params.id;

    if (id == null) {
        res.sendStatus(404);
        return;
    }

    var query = 'SELECT orderitem.id AS orderitemId, quantity, quantityPicked, idProduct,' +
                'name, stock, weight, alley, shelf, level, block ' +
                'FROM `orderpick` ' +
                'JOIN orderitem ON orderpick.idOrder = orderitem.idOrder ' +
                'JOIN product ON orderitem.idProduct = product.id ' +
                'WHERE idPicking=? '
    db.query(query, [id], function (err, result) {
        res.send(result)
    }).on('error', function (err) {
        console.log("[mysql error]", err);
    });
});



module.exports = router;