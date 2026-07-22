var mysql = require('mysql2')
var pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: '1234',
    port: process.env.ports,
    database: process.env.database,
    multipleStatements: true,
    connectionLimit: 100,
})
module.exports = pool