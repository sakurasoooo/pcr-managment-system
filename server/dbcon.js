var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_name',
  password        : '0000',
  database        : 'cs340_name'
});
module.exports.pool = pool;