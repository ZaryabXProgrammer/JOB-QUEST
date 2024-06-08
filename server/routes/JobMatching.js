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

const jobMatchingPercentage = async (jobDescription, resume) => {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant that helps users identify the matching percentage between job descriptions and resumes.",
      },
      {
        role: "user",
        content: `Analyze the following job description: ${jobDescription} and the following resume: ${resume}. Compare this resume text and the job description and give response in a single percentage number that whats the matching percentage for this job based on this resume,match resume skills with job description skills also, even if one keyword is found for job give score greater than 55% use easy matching guidlines dont stricly rely on keyword even if some keywords are matched Give response strictly only a single number`,
      },
    ],
  });

  const content = completion.choices[0].message.content.trim();
  const match = content.match(/\d+/); // Find the first number in the content

  return match ? match[0] : null;
};

router.post("/match", async (req, res) => {
  try {
    const { jobDescription, resume } = req.body;
    
    const matchingPercentage = await jobMatchingPercentage(
      jobDescription,
      resume
    );
    res.json({ matchingPercentage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
