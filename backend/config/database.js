const mongoose = require("mongoose")

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then((data) => {
      console.log(
        `Mongodb connected with Local server: ${data.connection.host}`
      )
    })
}

module.exports = connectDatabase
