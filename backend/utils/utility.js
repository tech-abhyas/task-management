const moment = require("moment-timezone")
const getCurrentDateTime = () => {
  const dateTime = moment.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
  return dateTime
}

module.exports = { getCurrentDateTime }
