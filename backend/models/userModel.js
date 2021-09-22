const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isInstructor: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePicture: {
      type: String,
      // required: true,
      default:
        "https://res.cloudinary.com/dizvyn9b5/image/upload/v1632241265/sjddbfkcij5tz8vokcmo.jpg",
    },
    githubLink: {
      type: String,
      // required: true,
      default: "",
    },
    linkedInLink: {
      type: String,
      // required: true,
      default: "",
    },
    mobileNumber: {
      type: Number,
      // required: true,
      default: 0,
    },
    domains: [
      {
        skillName: {
          type: String,
        },
      },
    ],
    description: {
      type: String,
      required: true,
      default: "Describe yourself",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enterredPassword) {
  return await bcrypt.compare(enterredPassword, this.password);
};

// Middleware for hashing password
// pre => before saving the user in the database
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
