const express = require('express')
require('dotenv').config()
const port = process.env.PORT
const app = express()
const db = require('./config/db')
const bodyparser = require('body-parser')
const cookieparser=require('cookie-parser')
const session = require('express-session')
app.use(bodyparser.urlencoded({extended:true}))
app.use(cookieparser());
app.use(bodyparser.json())



app.set('view engine','ejs');
app.set('views','./views')
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error in connecting server`);
    }
    console.log(`Server connected on port ${port}`);
})