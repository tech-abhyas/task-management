const express = require("express");
const taskContorllers = require("../controllers/taskController")
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();


router.route("/create").post(isAuthenticatedUser, taskContorllers.createTask);
router.route("/task-list").post(isAuthenticatedUser, taskContorllers.taskList);
router.route("/update").put(isAuthenticatedUser, taskContorllers.updateTask);
router.route("/delete/:task_id").delete(isAuthenticatedUser, taskContorllers.deleteTask);


module.exports = router