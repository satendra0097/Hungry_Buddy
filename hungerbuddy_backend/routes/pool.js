var mysql = require('mysql2')
var pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.ports,
    database: process.env.database,
    multipleStatements: true,
    connectionLimit: 100,
})
module.exports = pool