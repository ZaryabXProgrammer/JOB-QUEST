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

const generateLearningRoadmap = async (role, currentSkills) => {
  const completion = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant that helps users generate personalized learning roadmaps.",
      },
      {
        role: "user",
        content: `Generate a 3-week learning roadmap for the role of ${role} with the following current skills: ${currentSkills}. Give response week wise new week new line, Moreover for week#1 give some name of coursera coursera and udemy popular courses along with their links`,
      },
    ],
  });

  return completion.choices[0].message.content;
};

router.post("/generateLearningRoadmap", async (req, res) => {
  try {
    const { role, currentSkills } = req.body;
    const roadmap = await generateLearningRoadmap(role, currentSkills);
    res.json({ roadmap });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
