const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

  let token = req.headers.authorization;
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  token = token?.split(" ")
  token = token[1]
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const userData = await User.findById(decodedData.id);
  req.user = userData
  next();
});
