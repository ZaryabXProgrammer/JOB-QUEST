const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
      default: 'No Resume Found',
    },
    linkedIn: {
      type: String,
      default: '',
    },
    gitHub: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
    },
    address: {
      type: String,
      default: '',
    },
    workExperience: [{
      jobTitle: {
        type: String,
        default: ''
      },
      company: {
        type: String,
        default: ''
      },
      tenure: {
        type: String,
        default: ''
      },
    }, ],
    education: [{
      institutionName: {
        type: String,
        default: ''
      },
      university: {
        type: String,
        default: ''
      },
      degree: {
        type: String,
        default: ''
      },
    }, ],
    skills: {
      type: [String],
      default: [],
    },
  }, {
    timestamps: true
  } // will generate the timestamps
);

module.exports = mongoose.model("User", userSchema);