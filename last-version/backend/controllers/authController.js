const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

// @desc: Register user
// @route: GET /api/register
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
      name,
      email,
      password,
      avatar: {
          url: "static/images/default_user_avatar.png"
      }
  })

  const token = user.getJwtToken()

  sendToken(user, 200, res)

})

// @desc: Login user
// @route: GET /api/login
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return next(new ErrorHandler('Please enter email & password', 400))
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password', 401));
  }

  const token = user.getJwtToken()

  sendToken(user, 200, res)

})

// @desc: Logout user
// @route: GET /api/logout
const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true
  })

  res.status(200).json({
      success: true,
      message: 'Logged out'
  })
})

// @desc: Get user profile
// @route: GET /api/me
const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
      success: true,
      user
  })
})

// @desc: Update user password
// @route: PUT /api/password/update
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const { oldPassword, password } = req.body

  const user = await User.findById(req.user.id).select('+password');

  const isMatched = await user.comparePassword(oldPassword)
  if (!isMatched) {
      return next(new ErrorHandler('Old password is incorrect'));
  }

  user.password = password;
  await user.save();

  sendToken(user, 200, res)

})

// @desc: Update user profile
// @route: PUT /api/me/update
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  }

  // TODO: Update avatar

  const updateUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })

  res.status(200).json({
    success: true
  })

})

// @desc: Get all users
// @route: GET /api/admin/users
const allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
      success: true,
      users
  })

})

// @desc: Get user details
// @route: GET /api/admin/user/:id
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
      return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
  }

  res.status(200).json({
      success: true,
      user
  })

})

// @desc: Update user profile
// @route: PUT /api/admin/user/:id
const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role
  }

  const updateUser = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
  })

  res.status(200).json({
      success: true
  })

})

// @desc: Delete user
// @route: DELETE /api/admin/user/:id
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
      return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
  }

  // TODO: Remove avatar

  await user.remove();

  res.status(200).json({
      success: true,
  })

})

module.exports = { 
  registerUser, 
  loginUser, 
  logout, 
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser
}