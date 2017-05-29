var mysql = require('mysql');
// Create MySQL connection pool
var pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.SHUFFLE_HOST,
    user            : process.env.SHUFFLE_USER,
    password        : process.env.SHUFFLE_PASS,
    database        : process.env.SHUFFLE_DATA
});

// Pass all MySQL queries through this function
function sqlQuery(q, fn){
    var pool = require('./controllers').pool;
    pool.query(q, function(err, rows) {
        fn(rows);
    });
}

exports.pool = pool; // Export MySQL connection pool
exports.sqlQuery = sqlQuery; // Export MySQL query function
