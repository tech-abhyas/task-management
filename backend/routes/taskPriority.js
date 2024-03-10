const express = require("express");
const taskPriorityController = require("../controllers/taskPriorityController");

const router = express.Router();

router.post("/create", taskPriorityController.createTaskPriority)
router.get("/get-priority", taskPriorityController.getTaskPriority)

module.exports = router