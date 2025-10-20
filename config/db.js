// const mysql = require('mysql2/promise')

// const mySqlPool = mysql.createPool({
//     host: "localhost" ,
//     user: "root" ,
//     password: "Riyaverma@mysql" ,
//     database: "schools_db" ,
// })

// module.exports = mySqlPool ;.


const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const mySqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = mySqlPool;
