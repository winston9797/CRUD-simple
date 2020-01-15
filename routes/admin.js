const express = require('express')
const router = express.Router()


//requiring the article model
const Article = require("../models/article")

//home route
router.get('/',(req,res)=>{
    res.redirect('/admin')
})

//admin route
router.get('/admin',(req,res)=>{
    Article.find({},(err,post)=>{
        if(err){
            console.log('err')
        }else{
            res.render('index',{
                post:post
            })
        }
    })
})
//add article route
router.get('/admin/add/',(req,res)=>{
    res.render('add_article')
})

//Post request for addd article
router.post('/admin/add',(req,res)=>{
    const article = new Article()
    article.title = req.body.title
    article.author = req.body.author
    article.body = req.body.body
    console.log(article)
    article.save((err)=>{
        if(err){
            console.log("err")
        }else{
            console.log('Added')
            res.redirect('/admin')
        }
    })
})

//Update article get router
router.get('/admin/update/:title',(req,res)=>{
    Article.find({title:req.params.title},(err,post)=>{
        if(err){
            console.log('err')
        }else{
            res.render('update_article.ejs',{
                post:post
            })
        }
    })
    
})

//Updating files into databse
router.post('/admin/update/:title',(req,res)=>{
    const article = {}
    article.title = req.body.title
    article.author = req.body.author
    article.body = req.body.body
    const query = { title:req.params.title}
    Article.update(query,article,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Updated")
            res.redirect('/')
        }
    })
})

//Delete from database route
router.get('/admin/delete/:title',(req,res)=>{
    const query = { title:req.params.title}
    Article.deleteOne(query,(err,article)=>{
        if(err){
            console.log(err)
        }else{
            Article.remove();
            console.log("removed")
            res.redirect('/')
        }
    })
})

module.exports = router