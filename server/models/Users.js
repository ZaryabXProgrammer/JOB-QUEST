const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      default: 'No Resume Found', // Default value for resume URL is null
    },
  },
  { timestamps: true } // will generate the timestamps
);

module.exports = mongoose.model("User", userSchema);
