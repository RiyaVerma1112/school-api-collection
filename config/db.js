const mysql = require('mysql2/promise')

const mySqlPool = mysql.createPool({
    host: "localhost" ,
    user: "root" ,
    password: "Riyaverma@mysql" ,
    database: "schools_db" ,
})

module.exports = mySqlPool ;