const express = require("express")
require("dotenv").config()
const app = express()

const bodyParser = require("body-parser")

const path = require("path")
const cors = require("cors")
const errorMiddleware = require("./middleware/error")

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));

app.set("view engine", "ejs");
app.set('views', path.join(process.cwd(), '/BACKEND/views'));

// Route Imports
const userRoute = require("./routes/userRoute")
const taskRoute = require("./routes/taskRoute")
const taskCategory = require("./routes/taskCategory")
const taskPriority = require("./routes/taskPriority")


app.use("/api/v1/user", userRoute)
app.use("/api/v1/task", taskRoute)
app.use("/api/v1/category", taskCategory)
app.use("/api/v1/priority", taskPriority)


app.get("*", (req, res) => {
  res.send("Not Authorized")
})

// Middleware for Errors
app.use(errorMiddleware)
module.exports = app
