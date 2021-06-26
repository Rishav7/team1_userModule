// import express from 'express'
const express = require('express')
const router = express.Router()

// import {
//   authUser,
//   getUserProfile,
//   registerUser,
//   updateUserProfile,
//   uploadProfilePic,
//   forgotPassword,
//   resetPassword
// } from '../controllers/userController.js'
// import { protect } from '../middleware/authMiddleware.js'
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  uploadProfilePic,
  forgotPassword,
  resetPassword,
} = require( '../controllers/userController.js')
const { protect } = require( '../middleware/authMiddleware.js')

router.route('/').post(registerUser)

router.post('/login', authUser)
router.post('/forgotPassword',forgotPassword)
router.put('/resetPassword/:token',resetPassword)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

  router.route('/upload/:id')
  .put(uploadProfilePic);

// export default router
module.exports = router