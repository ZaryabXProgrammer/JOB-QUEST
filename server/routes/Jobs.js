import express from "express";
import bodyParser from "body-parser";
const Jobs = require("../models/jobs");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

app.post("/", async (req, res) => {
  const job = new Jobs(req.body);
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.put("/:id", async (req, res) => {
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

app.delete("/:id", async (req, res) => {
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

module.exports = router;
