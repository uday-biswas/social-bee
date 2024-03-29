// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    login,
    signup,
    sendOtp,
    changePassword,
    updateDisplayPicture,
} = require("../controllers/auth")
const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/resetPassword")

const { auth } = require("../middleware/auth")

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendOtp", sendOtp)

// Route for Changing the password
router.post("/changePassword", auth, changePassword)

// Route for updating the user's display picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router