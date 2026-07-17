var mysql = require('mysql')
var pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true,
    connectionLimit: 100,
})
module.exports = pool