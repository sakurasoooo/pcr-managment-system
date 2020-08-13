var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_liyi4',
  password        : '5962',
  database        : 'cs340_liyi4'
});
module.exports.pool = pool;