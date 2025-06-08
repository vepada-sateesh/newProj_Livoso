const mongoose = require("mongoose")
require('dotenv').config();


const connection_string = process.env.connection_string || ""
const connection = mongoose.connect(connection_string)

module.exports = {connection}