const express = require('express');
const jwt = require("jsonwebtoken");
const {taskModel} = require("../models/task.model");
const { userModel } = require('../models/user.model');
const sendMail = require('../config/sendMail'); 


const taskRoute = express.Router();

// constraint admin can only create tasks
taskRoute.post('/tasks', async(req, res) => {
    const { title, description, status, due_date } = req.body;
    const { email } = req.user;
    
    if (!title || !description || !status || !due_date) {
        return res.status(409).send({success:false,message:"please provide all details"})
    }
    try {

        let user = await userModel.findOne({
            email
        })

        if (user.role !== 'admin') {
            return res.status(403).send({success:false, message:"Un Authorized to create Task"})
        }

        // Create and save the user
        const newTask = new taskModel({
            title,
            description,
            status,
            dueDate: due_date,
            admin:email
        });

        await newTask.save();
        return res.status(201).send({
            success: true,
            message: "Task created successfully",
            task: newTask
        });
        


    } catch (err) {
        return res.status(501).send({success:false, message:"task created Unsuccessfully",error:err.message})
    }
})

// update task can be done by both user and admin
taskRoute.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, due_date } = req.body;
    const { email } = req.user;

    try {
        const user = await userModel.findOne({ email });

        if (!user || user.role !== 'admin') {
            return res.status(403).send({ success: false, message: "Unauthorized to update task" });
        }

        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            {
                title,
                description,
                status,
                dueDate: due_date,
                updatedAt: new Date()
            },
            { runValidators: true },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).send({ success: false, message: "Task not found" });
        }

        await sendMail(updatedTask.admin, "Task Updated", `The task "${updatedTask.title}" has been updated.`);

        return res.status(200).send({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: "Task update failed",
            error: err.message
        });
    }
});

// delete task by admin
taskRoute.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const { email } = req.user;

    try {
        // Fetch user from DB
        const user = await userModel.findOne({ email });
        
        // Check if user is admin
        if (user.role !== 'admin') {
            return res.status(403).send({ success: false, message: "Unauthorized: Admins only" });
        }

        // Delete task
        const deletedTask = await taskModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).send({ success: false, message: "Task not found" });
        }

        return res.status(200).send({ success: true, message: "Task deleted successfully" });

    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
});

// get list of all tasks
taskRoute.get('/tasks', async (req, res) => {
    try {
        const tasks = await taskModel.find({});
        return res.status(200).send({ success: true, data: tasks });
    } catch (err) {
        return res.status(500).send({ success: false, message: err.message });
    }
});








module.exports = { taskRoute };