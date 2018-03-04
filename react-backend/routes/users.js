var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/test', function (req, res, next) {
  // Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "D0loresH4ze"
  }]);


  db.query('SELECT 2 + 3 AS solution', function (err, rows, fields) {
    if (err)
      throw err

    console.log('The solution is: ', rows[0].solution);
  })
});


router.get('/', function (req, res, next) {
  db.query('SELECT * FROM userpicker', function (err, rows, fields) {
    if (err)
      throw err

    res.json(rows);
  })
});



module.exports = router;