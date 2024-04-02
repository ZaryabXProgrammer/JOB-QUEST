const express = require("express");
const router = express.Router();

const AppliedJobs = require("../models/AppliedJobs");

router.post("/", async (req, res) => {
  try {
    const appliedJob = new AppliedJobs(req.body);

    const newAppliedJob = await appliedJob.save();

    res.status(201).json(newAppliedJob);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
