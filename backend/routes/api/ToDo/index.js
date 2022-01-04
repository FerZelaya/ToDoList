var express = require('express')
var router = express.Router()
// var multer = require('multer')
// const path = require('path')
// const fs = require('fs')
// const model = require('./recipes.model')




router.get('/ToDos', (req,res)=>{
    res.send("Hello todos")
})


module.exports = router