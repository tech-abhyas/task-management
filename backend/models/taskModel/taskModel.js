const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        require: true
    },
    task_description: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    category_id: {
        type: mongoose.Schema.ObjectId,
        ref: "task_categories",
        required: true,
    },
    priority_id: {
        type: mongoose.Schema.ObjectId,
        ref: "task_priorities",
        required: true,
    },
    task_create_date: {
        type: Date,
        default: Date.now,
    },
    task_modify_date: {
        type: Date
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    }
})


module.exports = mongoose.model("task", taskSchema);