const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const taskCategoryModel = require("../models/taskModel/taskCategoryModel");

const getTaskCategory = catchAsyncErrors(async (req, res) => {
    try {
        const data = await taskCategoryModel.find()
        console.log(data)
        res.status(200).send(data)

    } catch (error) {
        res.status(400).send({
            message: "Data not found"
        })
    }

})

const createTaskCategory = catchAsyncErrors(async (req, res) => {
    try {
        const data = await taskCategoryModel.create({ ...req.body })
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({ message: "Category name should be unique." })
    }
})


const categoryControllers = {
    getTaskCategory,
    createTaskCategory
}

module.exports = categoryControllers