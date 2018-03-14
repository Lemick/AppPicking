var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser')
var async = require('async');
var dbUtils = require('../dbUtils');


router.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    db.query('SELECT * FROM alert', function (err, alerts) {
        async.forEachOf(alerts, function (alert, i, callback) {
            async.parallel([
                function (inner_callback) {
                    // Fetch user picker
                    db.query('SELECT * FROM userPicker WHERE id=?', alert['idUserPicker'], function (err, userPicker) {
                        alert['userPicker'] = userPicker[0];
                        inner_callback();
                    }).on('error', (err) => inner_callback(err));
                },
                function (inner_callback) {
                    // Fetch product
                    db.query('SELECT * FROM product WHERE id=?', alert['idProduct'], function (err, product) {
                        alert['product'] = product[0];
                        inner_callback();
                    }).on('error', (err) => inner_callback(err));
                }
            ], callback);
        }, function (err) {
            if (err) {
                console.log("[mysql error]", err)
                res.sendStatus(500);
            } else {
                res.send(alerts);
            }
        });
    }).on('error', (err) => console.log("[mysql error]", err));
});

router.get('/ishandled', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    db.query('SELECT * FROM alert WHERE isHandled=0', function (err, alerts) {
        async.forEachOf(alerts, function (alert, i, callback) {
            async.parallel([
                function (inner_callback) {
                    // Fetch user picker
                    db.query('SELECT * FROM userPicker WHERE id=? ', alert['idUserPicker'], function (err, userPicker) {
                        alert['userPicker'] = userPicker[0];
                        inner_callback();
                    }).on('error', (err) => inner_callback(err));
                },
                function (inner_callback) {
                    // Fetch product
                    db.query('SELECT * FROM product WHERE id=?', alert['idProduct'], function (err, product) {
                        alert['product'] = product[0];
                        inner_callback();
                    }).on('error', (err) => inner_callback(err));
                }
            ], callback);
        }, function (err) {
            if (err) {
                console.log("[mysql error]", err)
                res.sendStatus(500);
            } else {
                res.send(alerts);
            }
        });
    }).on('error', (err) => console.log("[mysql error]", err));
});


/**
 * Insertion d'un nouvelle alerte
 */
router.post('/new', function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');

    if (req.body.idProduct && req.body.idUserPicker) {
        let result = dbUtils.insertAlert(req.body.idProduct, req.body.idUserPicker, function (idNewAlert) {
            if (idNewAlert) {
                res.send(idNewAlert.toString());
            } else {
                res.send("");
            }
        });
    } else {
        res.sendStatus(400);
    }
});

router.get('/:id/handled', function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');

    if (id == null) {
        res.sendStatus(404);
        return;
    }

    db.query('UPDATE alert SET isFinished=1 WHERE id=' + id, function (err, alerts) {
        res.send("true");
    }).on('error', (err) => console.log("[mysql error]", err));

});

module.exports = router;