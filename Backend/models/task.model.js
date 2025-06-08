const mongoose = require("mongoose")

// create task schema using mongoose ODM

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], required: true },
    dueDate: { type: Date, default: Date.now() },
    admin:{type:String}
},{ timestamps: true })

const taskModel = mongoose.model("tasks", taskSchema)

module.exports = {taskModel}