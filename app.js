const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const ejs = require('ejs');

//Connecting to the database
mongoose.connect('mongodb://localhost:27017/winstonBlog', {useNewUrlParser: true});
const db = mongoose.connection;
//checking for the connectivity
db.on('error',()=> console.log('error'))
db.once('open',()=> console.log('Database connected'))

const app = express();

//requiring the article model
const Article = require("./models/article")

//body parser express middlware
app.use(bodyParser.urlencoded({extended:true}))

//set the render engine to ejs
app.set('view engine', 'ejs');


//require routes file
//this file store all the admin panel routers
app.use(require('./routes/admin'))

app.listen(3000,console.log('server started at port 3000'))