var mysql = require('mysql2')

var pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.ports,
    database: process.env.database,
    connectionLimit: 10,
    ssl: String(process.env.host).includes('aivencloud')
        ? { rejectUnauthorized: false }
        : undefined
})

module.exports = pool
