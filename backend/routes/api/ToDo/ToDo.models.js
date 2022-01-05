
const mongoose = require("mongoose")
const ObjectId = require('mongodb').ObjectId
const ToDoController = require('../../../schemas/ToDosSchema')


var todoColl = false;

module.exports = class {
    //initmodel
    static async initModel(){
        mongoose.connect(process.env.MONGODBURI, () => {
            todoColl = true
        })
        // if(!todoColl){
        //     let _db = await db.getDB()
        //     todoColl = await _db.collection('ToDos')
        //     console.log("ToDos collection created")
        //     return
        // } else {
        //     return
        // } 
    }

    //Show all ToDos
    static async showAllToDos(){
        try{
            if(todoColl){
                let ToDos = await ToDoController.find()
                return ToDos
            }
            return[]
        }catch(error){
            console.log(error);
            return error
        }
    }

    //Post a To Do
    static async postToDo(title, description, completed, date){
        const todo = new ToDoController({
            title: title,
            description: description,
            completed: completed,
            date: date
        })
        try {
            const savedToDo = await todo.save();
            return savedToDo;
        } catch(error){
            console.log(error);
            return error
        }

    }

    //update a to do
    static async updateToDo(title, description, completed, date, ToDoID){
        try {
            const updatedToDo = await ToDoController.updateOne(
                {_id: ToDoID},
                {$set: 
                    {
                        title: title,
                        description: description,
                        completed: completed,
                        date: date
                    }
                }
            );
            return updatedToDo;
        } catch(error){
            console.log(error);
            return error
        }

    }
}
