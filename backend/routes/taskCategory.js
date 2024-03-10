const express = require("express");
const categoryControllers = require("../controllers/taskCategoryController");

const router = express.Router();

router.post("/create", categoryControllers.createTaskCategory)
router.get("/get-category", categoryControllers.getTaskCategory)

module.exports = router