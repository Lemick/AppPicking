var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser')
var dbUtils = require('../dbUtils');


router.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    var query = 'SELECT * FROM picking'
    db.query(query, function (err, result) {
        res.send(result)
    }).on('error', function (err) {
        console.log("[mysql error]", err);
    });
});

/**
 * Renvoie la liste des produits liés à un ou plusieurs commandes liée(s) à un picking
 * Cette liste est triée en fonction du chemin le plus court dans la zone de picking
 */
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
        if (result.length > 0) {
            /**
             * Tri du chemin à parcourir
             */
            result.sort(dynamicSortBis('alley'));
        }
        res.send(result);
    }).on('error', function (err) {
        console.log("[mysql error]", err);
    });
});

/**
 * Sert à modifier la status d'un picking
 */
router.post('/setQuantityPicked', function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    if (req.body.idOrderItem && req.body.quantityPicked) {
        dbUtils.updateQuantityPicked(req.body.idOrderItem, req.body.quantityPicked, function (queryResult) {
            if (queryResult) {
                res.send("true");
            } else {
                res.send("");
            }
        });
    } else {
        res.sendStatus(400);
    }
});

/**
 * Sert à modifier la status d'un picking
 */
router.post('/terminate', function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    if (req.body.id) {
        let result = dbUtils.updatePickingStatus(req.body.id, function (idUpdatedPicking) {
            if (idUpdatedPicking) {
                res.send(idUpdatedPicking.toString());
            } else {
                res.send("");
            }
        });
    } else {
        res.sendStatus(400);
    }
});


/**
 * Utils
 */
function isEven(n) {
    return n % 2 == 0;
}

function dynamicSortBis(property, numberAlley) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {


        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        if (result == 0) {
            if (!isEven(a['alley']))
                var result = (a['shelf'] < b['shelf']) ? -1 : (a['shelf'] > b['shelf']) ? 1 : 0;
            else
                var result = (a['shelf'] > b['shelf']) ? -1 : (a['shelf'] < b['shelf']) ? 1 : 0;
        }
        return result * sortOrder;
    }
}

module.exports = router;