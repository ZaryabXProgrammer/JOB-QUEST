const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobLogo: {
      type: String, // Assuming the logo is stored as a file path or URL
      required: true,
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
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    datePosted: {
      type: Date,
      default: Date.now, // Default value is the current date and time
    },
  },
  { timestamps: true } // Will generate createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Jobs", jobSchema);
