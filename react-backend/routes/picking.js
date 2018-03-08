var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser')


router.post('/', function (request, response, next) {
    console.log(request.body.test);      // your JSON
    var health = request.body.health;
    var userId = request.body.id;

    if(health == null || userId == null) {
        response.send("-1");
    }
    
    response.send('true');    // echo the result back
});



module.exports = router;