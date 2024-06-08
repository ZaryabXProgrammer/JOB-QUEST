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

const analyzeSkillGaps = async (jobDescription, resume) => {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant that helps users identify missing skills and keywords in resumes based on job descriptions.",
      },
      {
        role: "user",
        content: `Analyze the following job description: ${jobDescription} and the following resume: ${resume}. Identify the missing skills and keywords or missing fields in the resume that are required for the job. Give Response in numbered bullets points concise`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

router.post("/analyzeSkillGaps", async (req, res) => {
  try {
    const { jobDescription, resume } = req.body;
    const missingSkills = await analyzeSkillGaps(jobDescription, resume);
    
    res.json({ missingSkills });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
