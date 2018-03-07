const TABLE_ORDER = '`order`';

var async = require('async');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pickingapp'
});

connection.connect(function (err) {
  if (err)
    console.error('ERROR : Connection DB failed (check the config in db.js)');
});

module.exports = connection;