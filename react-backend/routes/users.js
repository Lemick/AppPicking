var express = require('express');
var router = express.Router();
var db = require('../db');

// Multiplicateur permettant de calculer linéairement le poids maximal alloué à un utilisateur
const HEALTH_MULTIPLICATOR = 0.5; 

router.get('/:id/generatepicking', function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var id = req.params.id;

  if (id == null) {
    res.sendStatus(404);
    return;
  }

  db.query('SELECT * FROM userPicker WHERE id=?', [id], function (err, row) {
    var user = row[0]; 
  }).on('error', (err) => inner_callback(err));

  
});



module.exports = router;