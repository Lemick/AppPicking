var express = require('express');
var router = express.Router();
var db = require('../db');
var dbUtils = require('../dbUtils');
var async = require('async');

// Multiplicateur permettant de calculer linéairement le poids maximal alloué à un utilisateur
const HEALTH_MULTIPLICATOR = 0.9;


router.get('/coord', function (req, res, next) {
  dbUtils.getOrders(true, 'asc', function (orders) {

    var orderBase = orders[0];
    orders.splice(0, 1);
    res.send(findNearestOrder(null, orders).toString());
  });
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
  db.query('SELECT * FROM picking WHERE idUserPicker=? AND isFinished=0', [id], function (err, row) {
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

      if (orders.length == 0) {
        res.send("");
        return;
      }


      var lastOrderChoosen = null;
      while (currentWeight < maxWeight) {
        let indexNearestOrder = findNearestOrderUnderThreshold(lastOrderChoosen, orders, maxWeight - currentWeight);  
        if (indexNearestOrder == null) {
          break; // Plus de commandes à parcourir
        } else {
          lastOrderChoosen = orders[indexNearestOrder];
          currentWeight += orderItemsWeight(lastOrderChoosen['orderItem']);
          console.log('ADD POIDS SUIVANT');
          console.log(currentWeight);
          assignedOrders.push(lastOrderChoosen.id);
          orders.splice(indexNearestOrder, 1);
        }
      }

      console.log('assignedOrders');
      console.log(assignedOrders);
      if (assignedOrders.length > 0) {
        dbUtils.insertPicking(user.id, assignedOrders, function (newPickingId) {
          res.send(newPickingId.toString());
        });
      } else {
        res.send("");
        return;
      }

    });
  }).on('error', (err) => console.log("[mysql error]", err));
});


/**
 * UTILS
 */


/**
 * Retourne l'index de la commande la plus proche de la commande de base et restant sous le seuil de poids
 */
function findNearestOrderUnderThreshold(baseOrder, orders, threshold) {
  copyOrders = orders.slice(0);

  while (copyOrders.length > 0) {
    let indNearest = findNearestOrder(baseOrder, copyOrders); 
    let underThreshold = orderItemsUnderThreshold(copyOrders[indNearest]['orderItem'], threshold);  console.log(copyOrders[indNearest]['orderItem']);

    if (underThreshold != false) { // On à trouvé une commande en dessous du seuil de poids
      let pos = orders.map(function (e) { return e.id; }).indexOf(copyOrders[indNearest].id);
      return pos;

    } else { // La commande la plus proche est trop lourde, on la retire de la liste
      copyOrders.splice(indNearest, 1);
    }
  }
  return null;
}


/**
 * Retourne la commande la plus proche parmis une liste de commandes
 * (Celle ayant le barycentre le plus proche de notre commande réference)
 * Si baseOrder = null, alors on chercher la commande la plus proche de l'entrée
 */
function findNearestOrder(baseOrder, orders) {
  if (orders.length == 0)
    return -1;

  let baseBcenter = getCoordEntryPoint();
  if (baseOrder != null)
    baseBcenter = getBaryCenterOrder(baseOrder);
  let distance = Number.MAX_SAFE_INTEGER;
  let resIndex = -1;
  for (var i = 0; i < orders.length; i++) {
    let distanceElem = euclidianDistance(baseBcenter, getBaryCenterOrder(orders[i]));
    if (distanceElem < distance) {
      distance = distanceElem;
      resIndex = i;
    }
  }

  return resIndex;
}

// Retourne le poids de la commande si elle est en dessous du seuil, sinon false
function orderItemsUnderThreshold(orderItems, threshold) {
  var weightTotal = orderItemsWeight(orderItems); 
  if (weightTotal <= threshold)
    return weightTotal;
  else
    return false;
}

function orderItemsWeight(orderItems) {
  var weightTotal = 0;
  for (var i = 0; i < orderItems.length; i++) {
    let orderItem = orderItems[i];
    weightTotal += orderItem.product.weight * orderItem.quantity;
  }
  return weightTotal;
}

function getBaryCenterOrder(order) {
  var coordsProducts = [];
  for (var i = 0; i < order['orderItem'].length; i++) {
    let product = order['orderItem'][i].product;
    coordsProducts.push(getProductCoord(product));
  }
  return getBaryCenter(coordsProducts);
}

/**
 * Retourne le barycentre parmis un ensemble de coordonnés
 * @param {Ensemble de coordonnées à deux dimensions} setOfCoords 
 */
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

/**
 * Retourne les coordonnées (2D) liées à un produit
 */
function getProductCoord(product) {
  var coord = new Object();
  coord.x = product.alley;
  coord.y = product.shelf;
  return coord;
}

/**
 * Retourne la distance euclidienne (2D)
 */
function euclidianDistance(coord1, coord2) {
  return Math.sqrt((Math.pow(coord1.x - coord2.x, 2)) + (Math.pow(coord1.y - coord2.y, 2)));
}

function getCoordEntryPoint() {
  var coord = new Object();
  coord.x = 0;
  coord.y = 0;
  return coord;
}

module.exports = router;