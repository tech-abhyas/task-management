const mongoose = require("mongoose");

const taskPrioritySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    color: {
        type: String,
        require: true,
        unique: true,
    }
})

module.exports = mongoose.model("task_priority", taskPrioritySchema)