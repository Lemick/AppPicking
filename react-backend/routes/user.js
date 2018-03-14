var express = require('express');
var router = express.Router();
var db = require('../db');
var dbUtils = require('../dbUtils');
var async = require('async');
var distance = require('euclidean-distance')

// Multiplicateur permettant de calculer linéairement le poids maximal alloué à un utilisateur
const HEALTH_MULTIPLICATOR = 0.9;


router.get('/coord', function (req, res, next) {
  var c1 = new Object();
  c1.x = 1;
  c1.y = 2;

  var c2 = new Object();
  c2.x = 2;
  c2.y = 2;


  let test = euclidianDistance(c1, c2);

  console.log(getBaryCenter([{ "x": 1, "y": 0 }, { "x": 5, "y": 0 }, { "x": 10, "y": 0 }]));
  res.send("oui");
});


router.get('/test', function (req, res, next) {
  dbUtils.insertPicking(1, [10, 11, 12], function (idPicking) {

    res.send(idPicking.toString());
  });

});


router.get('/', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  dbUtils.getAllUsersPicker(function (users) {
    res.send(users);
  });
});


router.get('/:id/picking', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;

  if (id == null) {
    res.sendStatus(404);
    return;
  }

  // Fetch picking
  db.query('SELECT * FROM picking WHERE idUserPicker=?', [id], function (err, row) {
    if (row) {
      res.send(row[0]);
    } else {
      res.send("");
    }
  }).on('error', (err) => console.log("[mysql error]", err));

});


/**
 * TODO : renvoyer id du nouveau picking, si déja un picking existant renvoyer l'id du picking ?
 */
router.get('/:id/generatepicking', function (req, res, next) {

  res.setHeader('Content-Type', 'text/html');

  var id = req.params.id;

  if (id == null) {
    res.sendStatus(404);
    return;
  }

  // Fetch user
  db.query('SELECT * FROM userPicker WHERE id=?', [id], function (err, row) {
    var user = row[0];
    console.log(user);

    /**
     * TODO : On pourrait ici mettre un LIMIT pour ne pas avoir a parcourir l'ensemble des commandes pour calculer le groupements de comande
     */
    // Fetch unprocessed with priority for the oldest orders
    dbUtils.getOrders(true, 'asc', function (orders) {
      const maxWeight = user.health * HEALTH_MULTIPLICATOR;
      var assignedOrders = [];
      var currentWeight = 0;

      async.forEachOf(orders, function (order, i, callback) {
        console.log('je boucle sur l id order = ' + order.id)
        dbUtils.orderAlreadyAssignedToPicking(order.id, function (alreadyAssigned) {
          let isUnderMaxWeight = orderItemsUnderThreshold(order['orderItem'], maxWeight - currentWeight);
          if (alreadyAssigned == false && isUnderMaxWeight != false) {
            assignedOrders.push(order.id);
            currentWeight += isUnderMaxWeight;
          }
          callback(null);
        });
      }, function (err) {
        if (err) {
          console.err(err);

        } else {
          console.log('assignedOrders');
          console.log(assignedOrders);
          if (assignedOrders.length > 0) {
            dbUtils.insertPicking(user.id, assignedOrders, function (newPickingId) {
              res.send(newPickingId.toString());
            });
          } else {
            res.send("");
          }
        }
      });
    });
  }).on('error', (err) => console.log("[mysql error]", err));
});


/**
 * UTILS
 */

// Retourne le poids de la commande si en dessous du seuil, sinon false
function orderItemsUnderThreshold(orderItems, threshold) {
  var curr = 0;
  for (var i = 0; i < orderItems.length; i++) {
    let orderItem = orderItems[i];
    curr += orderItem.product.weight;
  }
  console.log('curr = ' + curr + ' and treshold = ' + threshold);
  if (curr <= threshold)
    return curr;
  else
    return false;
}

function getBaryCenter(setOfCoords) {
  if (setOfCoords.length == 0) {
    return null;
  }
  var result = new Object();
  result.x = 0;
  result.y = 0;
  for (var i = 0; i < setOfCoords.length; i++) {
    let coord = setOfCoords[i];
    result.x += coord.x;
    result.y += coord.y;
  }
  result.x = result.x / setOfCoords.length;
  result.y = result.y / setOfCoords.length;

  return result;
}


function getProductCoord(product) {
  var coord = new Object();
  coord.x = product.alley;
  coord.y = product.shelf;
}

function euclidianDistance(coord1, coord2) {
  return Math.sqrt((Math.pow(coord1.x - coord2.x, 2)) + (Math.pow(coord1.y - coord2.y, 2)));
}


module.exports = router;