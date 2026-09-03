var mysql = require('mysql2')

var pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.ports,
    database: process.env.database,
    connectionLimit: 5,
    queueLimit: 20,
    connectTimeout: 10000,
    waitForConnections: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: String(process.env.host || '').includes('aivencloud')
        ? { rejectUnauthorized: false }
        : undefined
})

pool.on('error', function(err) {
    console.error('Pool error:', err.code)
})

module.exports = pool
