const express = require("express");
const router = express.Router();

const AppliedJobs = require("../models/AppliedJobs");
const {
  verifyTokenandAuthorization,
  verifyToken,
} = require("../middleware/verifyToken");

router.get(
  "/find/:userId/:jobId",
  verifyTokenandAuthorization,
  async (req, res) => {
    try {
      const { userId, jobId } = req.params;

      const appliedJob = await AppliedJobs.findOne({ userId, jobId });

      res.json(appliedJob);
    } catch (error) {
      console.error("Error checking applied status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/find/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const appliedJobs = await AppliedJobs.find({ userId });
    res.json(appliedJobs);
  } catch (error) {
    console.error("Error getting all applied jobs for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get all applied jobs of particular user

router.get("/findall/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const appliedJobs = await AppliedJobs.find({ creatorId: userId });

    res.json(appliedJobs);
  } catch (error) {
    console.error("Error getting all jobs for this user", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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
