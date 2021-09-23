const asyncHandler = require("express-async-handler");
const Otp = require("../models/otpModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

/*
LIST OF CONTROLLERS
1. Send email of otp
2. Check otp
*/

// 1. Send email of otp
const sendEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  const data = await Otp.findOne({ email: email });
  // console.log(data);
  if (data) {
    // console.log(data._id);
    await Otp.findByIdAndRemove(data._id);
  }
  try {
    const otpCode = Math.floor(Math.random() * 1000000 + 1);
    const otpData = new Otp({
      email: email,
      otpCode: otpCode,
      expiresIn: new Date().getTime() + 300 * 1000,
    });
    const response = await otpData.save();
    // res.status(200).json({
    //   success: true,
    //   data: response,
    // });
    const output = `
      '<h2>OTP for email verification</h2>
    <p>Your OTP is ${otpCode}. OTP is valid for next 5 minutes.</p>
    <p></p>
    <p>Regards</p>
    <p>Team Full Stack Simplified</p>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${process.env.FSS_EMAIL}`, // generated ethereal user
        pass: `${process.env.FSS_PASSWORD}`, // generated ethereal password
      },
      // If on localhost
      tls: {
        rejectUnauthorized: false,
      },
      service: "gmail",
    });

    // send mail with defined transport object
    let mailOptions = {
      from: "Team Full Stack Simplified",
      to: `${email}`,
      subject: "OTP for email verification ✔",
      html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json(error);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).json({
          success: true,
          emailSuccess: true,
          data: response,
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      data: "Email does not exist ",
    });
  }

  // else {

  // }
});

// 2. Check otp
const checkOtp = asyncHandler(async (req, res) => {
  const { email, otpCode } = req.body;

  const data = await Otp.find({ email: email, otpCode: otpCode });

  if (data) {
    const currentTime = new Date().getTime();
    const difference = data.expiresIn - currentTime;
    if (difference < 0) {
      res.status(404).json({
        success: false,
        data: "Otp expired ",
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  }
});

module.exports = {
  sendEmail,
  checkOtp,
};
