const mongoose = require("mongoose");

const appliedJobsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    jobId: {
      type: String,

      required: true,
    },
    title: {
      type: String,

      required: true,
    },
    company: {
      type: String,

      required: true,
    },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "hired"],
      default: "applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AppliedJobs", appliedJobsSchema);
