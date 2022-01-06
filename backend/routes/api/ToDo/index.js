var express = require('express')
var router = express.Router()
var multer = require('multer')
const path = require('path')
const fs = require('fs')
const model = require('./ToDo.models')

const init = async () => {
    await model.initModel()
}
init()

//Main Get all to-dos from user
router.get('/ToDos', async(req,res)=>{
    try {
        const userID = req.user._id
        var results = await model.showAllUserToDos(userID)
        res.status(200).json(results)
    }catch(error){
        console.log(error);
        res.status(500).json({"ERROR":"Unable to fetch your To Dos"})
    }
})

//Create a to do
router.post('/ToDos',  async(req,res) => {
    try {
        var {title, description, priority, completed, date} = req.body
        const userID = req.user._id
        var result = await model.postToDo(title, description, priority, completed, date, userID);
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({"ERROR":"Unable to post your To Do"})
    }
})

//Update a to do
router.put('/ToDos/:ToDoID', async(req,res) => {
    try {
        var {title, description, priority, completed, date} = req.body
        var ToDoID = req.params.ToDoID
        var result = await model.updateToDo(title, description, priority, completed, date, ToDoID);
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({"ERROR":"Unable to update your To Do"})
    }
})

router.delete('/ToDos/:ToDoID', async(req,res) => {
    try {
        var ToDoID = req.params.ToDoID
        var result = await model.deleteToDo(ToDoID);
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({"ERROR":"Unable to delete your To Do"})
    }
})


module.exports = router