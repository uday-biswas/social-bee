const User = require("../models/user");
const Otp = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const uploadImageToCloudinary = require("../utils/imageUploader");
const passwordUpdated = require("../mailTemplate/passwordUpdated");

require("dotenv").config();

// otp generator
const sendOtp = async (req, res) => {
  try {
    // fetch email
    const { email } = req.body;

    // check if user is already exists
    const checkUserPresent = await User.findOne({ email });

    // if user already exists , return response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "user already registered",
      });
    }

    // generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(`generated otp are  : - > ${otp}`);

    // check unique otp or not
    let result = await Otp.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };

    // create an entry in db
    const otpBody = await Otp.create(otpPayload);

    // return success response
    return res.status(200).json({
      success: true,
      message: "otp sent successfully",
      data: otpBody,
    });
  } catch (err) {
    console.log(`not able to generate otp  ${err}`);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// signup
const signup = async (req, res) => {
  try {
    // fetch data from req body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
    } = req.body;
    // validate
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "please fill all the fields",
      });
    }
    // check user is already registered or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already registered",
      });
    }
    // verify the password and confirm password
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password and confirm password value does not match",
      });
    }
    // find most recent otp stored for the user
    const recentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(`recentOtp : -> ${recentOtp}`);
    console.log(`${email}`);

    // validate otp
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "otp not found",
      });
    } else if (otp != recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "invalid otp",
      });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // save the entry in the db
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    // return response
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (err) {
    console.log(`not able to signup ${err}`);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    // fetch data
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "please fill all the fields",
      });
    }

    // check user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not registered",
      });
    }

    // generate token after verifying the password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;
      // return success response
      const options = {
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),  //token will expire in 10 days
        httpOnly: true,
      };
      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "login successfully",
        user,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }
  } catch (err) {
    console.log(`not able to login ${err}`);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};

const updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    console.log(`display picture  ; -> ${displayPicture}`);
    const userId = req.user.id;
    console.log(`userId : - > ${userId}`);
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log("image URL are : - >", image?.secure_url);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "issue with updating the profile picture",
      error: err.message,
    });
  }
};

module.exports = { sendOtp, signup, login, changePassword, updateDisplayPicture };
