const express = require("express");

const { sendEmail, checkOtp } = require("../controllers/otpControllers");

const router = express.Router();

// Send email of otp
router.route("/sendEmail").post(sendEmail);

// Check otp
router.route("/checkOtp").post(checkOtp);

module.exports = router;
