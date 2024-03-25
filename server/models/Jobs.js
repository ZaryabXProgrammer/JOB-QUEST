const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobLogo: {
      type: String,
      default: "http://example.com/logo.png",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    applicants: {
      type: Number,
      default: 0, // Default value for number of applicants
    },
    jobType: {
      type: String, //full time, contract freelance
      required: true,
    },
    workLocation: {
      type: String, //on site remote opr hybrid
      required: true,
    },
    experience: {
      //beginner, exper etc
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      default: 0,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: "Not Mentioned",
    },
  },
  {
    timestamps: true,
  } // Will generate createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Jobs", jobSchema);
