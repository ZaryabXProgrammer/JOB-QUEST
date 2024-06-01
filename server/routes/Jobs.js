const express = require("express");
const router = express.Router();
const Jobs = require("../models/Jobs");


router.use(function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
});


router.get("/", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.json(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

router.get("/job/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Jobs.findOne({
      _id: jobId
    });
    res.json(job);
  } catch (error) {
    res.status(400).json({
      message: "Job not found"
    });
  }
});

router.get("/search", async (req, res) => {
  const titleQuery = req.query.title.trim();

  try {
    const jobs = await Jobs.find({
      title: {
        $regex: new RegExp(titleQuery, "i")
      },
    });

    if (jobs.length > 0) {
      res.status(200).json({
        jobs
      });
    } else {
      res.status(404).json({
        message: "Jobs Not Found"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const job = new Jobs(req.body);
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error"
    });
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
      message: err.message
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Jobs.findByIdAndDelete(req.params.id);
    res.json({
      message: "Job listing deleted"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;