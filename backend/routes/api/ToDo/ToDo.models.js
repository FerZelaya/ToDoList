
const mongoose = require("mongoose")
const ObjectId = require('mongodb').ObjectId
const ToDoController = require('../../../schemas/ToDosSchema')


var todoColl = false;

module.exports = class {
    //initmodel
    static async initModel(){
        try {
            // Connect to the MongoDB cluster
            mongoose.connect(
              process.env.MONGODBURI,
              { useNewUrlParser: true, useUnifiedTopology: true },
              () => {todoColl = true}
            );
        
        } catch (e) {
            console.log("could not connect");
        }
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
    static async postToDo(title, description, priority, completed, date){
        const todo = new ToDoController({
            title: title,
            description: description,
            priority: priority,
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
    static async updateToDo(title, description, priority, completed, date, ToDoID){
        try {
            const updatedToDo = await ToDoController.updateOne(
                {_id: ToDoID},
                {$set: 
                    {
                        title: title,
                        description: description,
                        priority: priority,
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

    //update a to do
    static async deleteToDo(ToDoID){
        try {
            const filter = {_id: ToDoID}
            const deletedToDo = await ToDoController.deleteOne(filter)
            return deletedToDo;
        } catch(error){
            console.log(error);
            return error
        }

    }
}
