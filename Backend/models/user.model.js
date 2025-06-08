const mongoose = require("mongoose")

// create user schema using mongoose ODM

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    age:{type:Number,required:true},
    role:{type:String,enum:['admin','user'],required:true}
},{ timestamps: true })

const userModel = mongoose.model("users", userSchema)

module.exports = {userModel}