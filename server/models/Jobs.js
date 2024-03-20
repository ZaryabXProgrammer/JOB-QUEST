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
      type: [String], // Array of job types (e.g., full-time, part-time, contract)
      required: true,
    },
    salary: {
      type: Number, // Assuming salary is stored as a string (e.g., "$80,000 - $100,000")
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    datePosted: {
      type: Date,
      default: Date.now, // Default value is the current date and time
    },
  },
  { timestamps: true } // Will generate createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Jobs", jobSchema);
