var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ToDoSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: false},
    priority: {type: String, required: false},
    completed: {type: Boolean, required: true},
    date: {type: Date, default: Date.now,required: false}
}, {collection: 'ToDos'})

var ToDoController = mongoose.model('ToDoController', ToDoSchema)


module.exports = ToDoController; 