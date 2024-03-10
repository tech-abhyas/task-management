const app = require("./app");
// const cloudinary = require("cloudinary");
require("dotenv").config();

const connectDatabase = require("./config/database");
const { getCurrentDateTime } = require("./utils/utility");
var cron = require('node-cron');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   // require("dotenv").config({ path: "backend/config/config.env" });
// }

// Connecting to database
connectDatabase();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const server = app.listen(process.env.NODE_LOCAL_PORT || 8080, () => {
//   console.log(process.env.NODE_LOCAL_PORT || 8080);
//   console.log(`Server is working on http://localhost:${process.env.NODE_LOCAL_PORT || 8080}`);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // console.log(getCurrentDateTime())
  console.log(`Server listening on port ${port}`);
});
// product ordered time - processing - 2024-02-19 22:50:11
// cron jon run in every 10 min - 2024-02-19 22:55:11 - 10 min - 2024-02-19 22:45:11
// check order before or equal 2024-02-19 22:45:11
// where order status - processing
// update new status - failed
// update reason - payment not received


// cron.schedule('*/30 * * * * *', () => {
//   console.log('running a task every 30 sec', getCurrentDateTime())
// });
// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
