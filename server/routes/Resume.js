const express = require("express");
const router = express.Router();
const PDFParser = require("pdf-parse");
const natural = require("natural");
const multer = require("multer");
const Jobs = require("../models/Jobs");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to handle JSON and file uploads
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const uploadResume = upload.single("resume");

// Define the resume parsing function
const parseResume = async (resumeBuffer) => {
  try {
    // Parse the resume PDF buffer
    const pdfData = await PDFParser(resumeBuffer);
    const resumeText = pdfData.text;

    // Implement more advanced skill extraction logic
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(resumeText.toLowerCase()); // Tokenize and convert to lowercase for consistency

    const skills = [];
    tokens.forEach((token, index) => {
      // Check for words/phrases that indicate skills
      if (
        token.includes("skill") ||
        token.includes("experience with") ||
        token.includes("proficient in") ||
        token.includes("knowledge of")
      ) {
        // Add the following token as a skill (can be extended based on context and common skill-related terms)
        skills.push(tokens[index + 1]);
      }
    });

    return skills;
  } catch (error) {
    throw new Error("Error parsing resume");
  }
};

// API endpoint to handle resume parsing from the frontend
router.post("/parse-resume", uploadResume, async (req, res) => {
  try {
    if (!req.file && !req.body.resume) {
      return res.status(400).json({ error: "No resume file or data uploaded" });
    }

    const resumeBuffer = req.file
      ? req.file.buffer
      : Buffer.from(req.body.resume, "base64");

    // Parse the resume buffer and extract skills
    const skills = await parseResume(resumeBuffer);

    // Search for jobs in the database that match the extracted skills
    const matchingJobs = await Jobs.find({ skills: { $in: skills } });

    // Respond with the extracted skills and matching jobs
    res.json({ matchingJobs });
  } catch (error) {
    console.error("Error parsing resume:", error);
    res.status(500).json({ error: "Error parsing resume" });
  }
});

module.exports = router;
