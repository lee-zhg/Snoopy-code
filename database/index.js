const mysql = require('mysql2')

var dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'password',
  database: 'grocery',
  port: 3306,
})

dbConnection.connect((err) => {
  if (err) {
    throw err
  } else {
    console.log('Successfully connected to database.')
  }
})

module.exports = dbConnection
