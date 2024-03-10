const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel/userModel");
const crypto = require("crypto");
const sendEmailProd = require("../utils/sendEmailProd");


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const emailToken = crypto.randomBytes(20).toString("hex");
    let emailVerificationToken = crypto.createHash("sha256").update(emailToken).digest("hex")
    let user = await User.create({
      name,
      email,
      password,
      emailVerificationToken
    });

    // mail config
    let subject = "Email Confirmation"
    let data = {
      redirectUrl: `${process.env.FRONTEND_DEV_BASE_URL}/email/verify/${emailToken}`
    }
    await sendEmailProd(email, subject, data)


    res.status(201).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    })
  }
});



// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email, isEmailVerified: 1 });
  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const token = user.getJWTToken();
  const userData = {
    _id: user._id,
    name: user.name,
    email: user.email
  }

  res.status(200).json({
    success: true,
    user: userData,
    token,
  });
});


// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });


  try {
    // console.log("resetPasswordUrl", resetPasswordUrl)
    res.status(200).json({
      success: true,
      message: `Reset password token generated`,
      data: resetToken
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});



// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  // user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res.status(200).json({
    success: true,
    message: "Password Update"

  });
});



// Email Verify
exports.emailVerify = catchAsyncErrors(async (req, res, next) => {
  // creating token hash

  const emailVerificationToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // console.log("emailVerificationToken", emailVerificationToken)
  const user = await User.findOne({
    emailVerificationToken,
    isEmailVerified: 0,
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Email Token is invalid or has been verified",
        400
      )
    );
  }

  // update value if match the token
  user.isEmailVerified = 1;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Email Verified"

  });
});


