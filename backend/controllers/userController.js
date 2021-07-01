const asyncHandler = require('express-async-handler')
const { nextTick } = require('process')
const { errorHandler } = require('../middleware/errorMiddleware.js')
const User = require('../models/userModel.js')
const generateToken = require('../utils/generateToken.js')
const sendEmail = require('../utils/email.js')
const crypto = require('crypto');
const path = require('path');



// desc   register a new Profile
// route   POST /api/users
// access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})
// @desc    Login User with auth & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      photo: user.photo,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    get user & get token
// @route   POST /api/users/login
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})


// @desc   regis ter a new Profile
// @route   put /api/users/profile
// @access  protected

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (user) {

    user.name = req.body.name || user.name
    user.email = req.body.email || user.name

    if (req.body.password) {
      user.password = req.body.password
    }
    const updateUser = await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)


    //ekjfdhekw

    throw new Error('User Not Found')

  }
})


const uploadProfilePic = asyncHandler(async (req, res, next) => {

  // find the user .. id;
  console.log("Initiating a handshake.....".red.bold)
  let user = await User.findById(req.params.id);


  console.log("Found User......".green.bold)
  console.log(user)
  if (!user) return next({ status: 404, message: 'User not found' })

  if (!req.files) return next({ status: 404, message: 'Please upload file' })

  // file instance
  const file = req.files.file

  console.log("1", file.name);
  console.log(user._id);
  console.log(path.parse(file.name).ext)
  file.name = `pic_${user._id}${path.parse(file.name).ext}`

  console.log("2", file.name);

  file.mv(`backend/public/uploads/${file.name}`, async (err) => {
    console.log(err)
    if (err) return next({ status: 500, message: 'Cant upload file' })
    console.log("inside");
    const result = await User.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.json({ success: true, data: file.name })
  })

})
//Forgot Password

const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400)
    throw new Error("No user with given email address")
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforesave: false });
  const message = `You are receiving this because you have requested the reset of the password from your account.\n\n`+
  `Please click on the following link or paste this into your browser to complete the process within 10 minutes of receiving it:\n\n`+
  `http://localhost:3000/resetPassword/${resetToken}\n\n`+
  `If you did not request this, please ignore this mail and your password will remain unchanged`

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token(valid for 10 min)',
      message
    });
    res.status(200).json({
      status: 'success',
      message: 'Mail sent'
    });

  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforesave: false });
    res.status(500)
    throw new Error('Error in sending mail')
  }

});


//resetPassword
const resetPassword = asyncHandler(async (req, res) => {

  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    res.status(500)
    throw new Error('Token expired')
  }
  if (req.body.password !== req.body.confirmPassword) {
    return (new ErrorHandler('Password does not match', 400))
  }

  user.password = req.body.password;
  // user.passwordConfirm
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  const token = generateToken(user._id);
  res.status(200).json({
    status: 'success',
    message:"PASSWORD CHANGED",
    token
  });

})

module.exports = { authUser, registerUser, getUserProfile, updateUserProfile, uploadProfilePic, forgotPassword, resetPassword }

