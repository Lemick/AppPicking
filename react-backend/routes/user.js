var express = require('express');
var router = express.Router();
var db = require('../db');
var dbUtils = require('../dbUtils');
var async = require('async');


router.get('/test', function (req, res, next) {
  dbUtils.insertPicking(1, [10, 11, 12], function (idPicking) {

    res.send(idPicking.toString());
  });

});

/**
 * TODO : renvoyer id du nouveau picking, si déja un picking existant renvoyer l'id du picking ?
 */
router.get('/:id/generatepicking', function (req, res, next) {

  // Multiplicateur permettant de calculer linéairement le poids maximal alloué à un utilisateur
  const HEALTH_MULTIPLICATOR = 0.5;

  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;

  if (id == null) {
    res.sendStatus(404);
    return;
  }

  // Fetch user
  db.query('SELECT * FROM userPicker WHERE id=?', [id], function (err, row) {
    var user = row[0]; 
    /**
     * TODO : On pourrait ici mettre un LIMIT pour ne pas avoir a parcourir l'ensemble des commandes pour calculer le groupements de comande
     */
    // Fetch unprocessed with priority for the oldest orders
    dbUtils.getOrders(true, 'asc', function (orders) {
      const maxWeight = user.health * HEALTH_MULTIPLICATOR;
      var assignedOrders = [];
      var currentWeight = 0;
      for (var order in orders) {
        if (order.weight + currentWeight < maxWeight) {
          assignedOrders.push(orders.id);
          currentWeight = order.weight;
        }
        dbUtils.insertPicking(idUser, assignedOrders, function(newPickingId) {
          res.send(newPickingId.toString());
        });
      }
    });
  }).on('error', (err) => console.log("[mysql error]", err));
  res.send("");
});




module.exports = router;