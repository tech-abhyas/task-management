const mongoose = require("mongoose");

const taskCategorySchema = new mongoose.Schema({
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

module.exports = mongoose.model("task_category", taskCategorySchema)