var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser')

router.post('/', function (request, response, next) {
    console.log(request.body);      // your JSON
    response.send('true');    // echo the result back
});



module.exports = router;