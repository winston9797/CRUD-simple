const mongoose = require("mongoose");

//Article Schema
const articleSchema = new mongoose.Schema({
    title : String,
    author: String,
    body:String
})


const Article = module.exports = mongoose.model('articles',articleSchema)