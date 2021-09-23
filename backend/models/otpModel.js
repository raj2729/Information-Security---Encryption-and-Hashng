const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      //   required: true,
    },
    otpCode: {
      type: String,
      //   required: true,
    },
    expiresIn: {
      type: Number,
      // required: true,
      //   default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
