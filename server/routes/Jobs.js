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

//get job py job title

router.get("/search", async (req, res) => {
  const titleQuery = req.query.title.trim();

  try {
    const jobs = await Jobs.find({
      title: { $regex: new RegExp(titleQuery, "i") },
    });

    if (jobs.length > 0) {
      res.status(200).json({ jobs });
    } else {
      res.status(404).json({ message: "Jobs Not Found " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
    const { filters, salary } = req.body;

    console.log(req.body);

    let filteredJobs;

    if (
      filters === "Full-Time" ||
      filters === "Part-Time" ||
      filters === "Internship" ||
      filters === "Contractual" ||
      filters === "Freelance"
    ) {
      filteredJobs = await Jobs.find({ jobType: filters });
    } else if (
      filters === "Remote" ||
      filters === "Hybrid" ||
      filters === "On-Site"
    ) {
      filteredJobs = await Jobs.find({ workLocation: filters });
    } else if (
      filters === "Fresher" ||
      filters === "Beginner" ||
      filters === "Intermediate"
    ) {
      filteredJobs = await Jobs.find({ experience: filters });
    } else if (salary) {
      filteredJobs = await Jobs.find({ salary: { $gt: salary } });
    } else {
      // Handle invalid or missing filters
      return res.status(400).json({ error: "Invalid filters" });
    }

    return res.json(filteredJobs);
  } catch (error) {
    console.error("Error applying filters:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});





//   const jobTypesLabels = [
//     "Full-Time",
//     "Part-Time",
//     "Freelance",
//     "Contractual",
//     "Internship",
//   ];
//   if (jobTypesLabels.includes(filters)) {
//     updatedFilters.jobType = filters; // Set jobType to label if checked, otherwise empty string
//   } else if (
//     filters === "On-site" ||
//     filters === "Remote" ||
//     filters === "Hybrid"
//   ) {
//     updatedFilters.workLocation = filters; // Set workLocation to label if checked, otherwise empty string
//   } else if (
//     filters === "Fresher" ||
//     filters === "Beginner" ||
//     filters === "Intermediate"
//   ) {
//     updatedFilters.experience = filters; // Set experienceLevel to label if checked, otherwise empty string
//   }

//   // Update the filters state with the updatedFilters object

//   try {
//     const filteredJobs = await filterController.applyFilters(updatedFilters);
//     console.log("Filtered jobs:", filteredJobs);
//     res.json(filteredJobs);
//   } catch (err) {
//     console.error("Error filtering jobs:", err);
//     res.status(500).json({
//       message: "Internal server error",
//     });
//   }
  // });
  
module.exports = router;
