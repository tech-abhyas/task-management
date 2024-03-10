const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const taskPrioritySchema = require("../models/taskModel/taskPriority")


const getTaskPriority = catchAsyncErrors(async (req, res) => {
    try {
        const data = await taskPrioritySchema.find()
        res.status(200).send(data)
    } catch (error) {
        console.log("error", error)
        res.status(400).send({
            success: false,
            message: error.message
        })
    }

})

const createTaskPriority = catchAsyncErrors(async (req, res) => {
    try {
        // let name = req.body.name
        const data = await taskPrioritySchema.create({ ...req.body })
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        })
    }
})


const priorityControllers = {
    getTaskPriority,
    createTaskPriority
}

module.exports = priorityControllers