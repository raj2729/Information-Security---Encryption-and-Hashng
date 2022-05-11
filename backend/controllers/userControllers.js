const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../middlewares/generateToken");
const cryptojs = require("crypto-js");
const crypto = require("crypto");

/*
LIST OF CONTROLLERS
1. Register User
2. Login User
3. Get user Details
4. Update User
5. Apply for instructor
*/

const algorithm = "aes-256-cbc";
const passKey = "Information Security";
// Defining password
// const password = 'bncaskdbvasbvlaslslasfhj';

// Defining key
// const key = crypto.scryptSync(passKey, "Raj", 32);

// const iv = crypto.randomBytes(16);
// const iv = crypto.scryptSync(passKey, "Raj", 16);

// let cipher = crypto.createCipheriv(algorithm, key, iv);

// Register New user
const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password, address, number } = req.body;
  // console.log("Hello World");
  // let textData = password;

  let secretKey = "Information Security";
  // let encryptedData = cryptojs.AES.encrypt(textData, secretKey, {
  //   mode: cryptojs.mode.ECB,
  // }).toString();

  // console.log("Encrypted Data = " + encryptedData);
  // --------------------------------------------------------

  var cipher = crypto.createCipher("aes256", secretKey);
  var encrypted = cipher.update(password, "utf8", "hex") + cipher.final("hex");
  console.log("Encrypted Data = " + encrypted);
  // -------------------------------------------------------
  // console.log(cipher);
  // console.log("Key = " + key);
  // console.log("iv = " + iv);

  // let encrypted = cipher.update(password);

  // encrypted = Buffer.concat([encrypted, cipher.final()]);
  // console.log("Encrypted" + encrypted.toString("hex"));
  // return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  // ----------------------------------------------------------
  const messageDigest = crypto
    // .createHmac("md5", secretKey)
    .createHmac("sha256", passKey)
    .update(encrypted.toString("hex"))
    .digest("hex");
  console.log("Message Digest = " + messageDigest);

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(200).json({
      success: false,
      data: "User already exists",
    });
  } else {
    const user = await User.create({
      name,
      email,
      password,
      address,
      number,
      encryptedData: encrypted,
      messageDigest: messageDigest,
    });
    // const userId = user._id;

    res.status(201).json({
      success: true,
      data: "Register successful",
    });
  }
});

// Login existing users
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log("Password = " + password);
  // let textData = password;

  let secretKey = "Information Security";
  // let encryptedData = cryptojs.AES.encrypt(textData, secretKey).toString();

  var cipher = crypto.createCipher("aes256", secretKey);
  var encrypted = cipher.update(password, "utf8", "hex") + cipher.final("hex");
  // console.log("Encrypted Data = " + encrypted);
  const messageDigest = crypto
    // .createHmac("md5", secretKey)
    .createHmac("sha256", passKey)
    .update(encrypted.toString("hex"))
    .digest("hex");
  // console.log("Message Digest = " + messageDigest);

  const user = await User.findOne({ email });

  if (user && user.messageDigest.localeCompare(messageDigest) === 0) {
    console.log("Logged IN");
    res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    console.log("Not Logged IN");
    res.status(200).json({
      success: false,
      data: "Login failed",
    });
  }
});

// User can see his/her details - Protected Route
const getUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({
      success: true,
      data: user,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});
module.exports = {
  registerUser,
  userLogin,
  getUserDetails,
};
