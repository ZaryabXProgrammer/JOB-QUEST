const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
    "X-Title": process.env.YOUR_SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
  },
});

const generateCoverLetter = async (jobDescription, resume) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI assistant that helps candidates to generate cover letters for their jobs.",
        },
          {
              role: "user",
              content: `Analyze the following job description: ${jobDescription} and the following resume: ${resume}. Generate a cover letter for these jobs. Make sure to include relevant experiences, education, projects, and live projects from the resume and match them with the job description to tell the HR manager that you are deserving of this position. Start with 'Hiring Manager' and do not include any escape characters like '\\n' in the text. Provide raw text and do not include '\n\nBest regards, \n\n[Your Name]' Take educational and work experience details from my resume to generate the cover letter and don't leave anything blank.`,
          }
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error(`Failed to generate cover letter: ${error.message}`);
  }
};

router.post("/generateCoverLetter", async (req, res) => {
  try {
    const { jobDescription, resume } = req.body;

    if (!jobDescription || !resume) {
      return res
        .status(400)
        .json({ error: "Job description and resume are required." });
    }

    const coverLetter = await generateCoverLetter(jobDescription, resume);
    res.json({ coverLetter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
