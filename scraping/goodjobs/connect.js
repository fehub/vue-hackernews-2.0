const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '891208',
  database : 'goodjobs'
});

module.exports = connection;

// connection.connect();

// connection.query('SELECT title FROM articles WHERE author = "刘佳昕"', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results[0].title);
// });

// connection.end();