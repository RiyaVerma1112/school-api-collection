const express = require('express')
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');

// configure dotenv
dotenv.config()

// rest object
const app = express()

// middleware
app.use(express.json()) ;

// routes
app.use('/api' , require("./routes/schoolsRoutes")) ;

app.get('/test' , (req , res) => {
    res.status(200).send('<h1>Node js MySQL App</h1>')
})

// port 
const PORT = process.env || 8000 ;

// conditionally listen
mySqlPool.query('SELECT 1').then(() => {
    console.log('Mysql DB connected')
    // listen
    app.listen(PORT , () => {
        console.log(`Server Running on port ${process.env.PORT}`) ;
    }) ;
}).catch((error) => {
    console.log(error) ;
})
