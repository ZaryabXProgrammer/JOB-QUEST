const express = require("express");
const Jobs = require("../models/Jobs");
const router = express.Router();
const filterController = require("../routes/Filter");
// Custom logger middleware
router.use(function logger(req, res, next) {
  console.log(req.method, req.url);
  next(); // Call next to proceed to the next middleware or route handler
});

router.get("/", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.json(jobs);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const job = new Jobs(req.body);
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Jobs.findByIdAndDelete(req.params.id);
    res.json({
      message: "Job listing deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.post("/filter", async (req, res) => {
  try {
    const filteredJobs = await filterController.applyFilters(req.body);
    console.log("Filtered jobs:", filteredJobs);
    res.json(filteredJobs);
  } catch (err) {
    console.error("Error filtering jobs:", err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
})
module.exports = router;