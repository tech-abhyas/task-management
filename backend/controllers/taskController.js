const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const taskModel = require("../models/taskModel/taskModel");
const { getCurrentDateTime } = require("../utils/utility");


const createTask = catchAsyncErrors(async (req, res) => {
    const reqData = {
        task_create_date: getCurrentDateTime(),
        user_id: req.user._id,
        ...req.body
    }
    try {
        const saveTask = await taskModel.create(reqData)
        res.status(201).json({
            success: true,
            saveTask,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
})


const updateTask = catchAsyncErrors(async (req, res, next) => {
    const reqData = req.body
    const query = { _id: reqData.task_id };

    // find by id and update
    try {
        const updateTask = await taskModel.findByIdAndUpdate(query, reqData, { new: true, runValidators: true })
        res.status(200).json({
            success: true,
            updateTask
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

})


const deleteTask = catchAsyncErrors(async (req, res, next) => {
    // console.log("req", req)
    const reqData = req.params
    const query = { _id: reqData.task_id };

    // find by id and update
    try {
        const deleteTask = await taskModel.findByIdAndDelete(query)
        res.status(200).json({
            success: true,
            deleteTask
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
})

const taskList = catchAsyncErrors(async (req, res, next) => {

    // get the name from the other collection
    const agg = [
        {
            '$lookup': {
                'from': 'task_categories',
                'localField': 'category_id',
                'foreignField': '_id',
                'as': 'category'
            }
        }, {
            '$lookup': {
                'from': 'task_priorities',
                'localField': 'priority_id',
                'foreignField': '_id',
                'as': 'priority'
            }
        }
    ];

    try {
        const result = await taskModel.aggregate(agg)
        res.status(200).json({
            success: true,
            result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
})


const taskContorllers = {
    createTask,
    updateTask,
    deleteTask,
    taskList
}

module.exports = taskContorllers