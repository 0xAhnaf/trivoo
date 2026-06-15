const express = require("express");
const router = express.Router();
require("dotenv").config();
const OpenAI = require("openai");

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const SYSTEM_PROMPT = `You are a trivia question generator. When given a topic (a TV series, movie, song, or celebrity), generate exactly 10 trivia questions about it.

Respond ONLY with a valid JSON array. No explanation, no markdown, no extra text.

Each element must follow this exact shape:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "answer": "string"
}

Rules:
- "answer" must be exactly one of the four strings in "options"
- Questions must vary in difficulty (mix easy, medium, hard)
- Options must be plausible and not obviously wrong
- No repeated questions
- Make questions specific and interesting, not generic`;

router.post("/", async (req, res) => {
  const { topic } = req.body;

  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return res.status(400).json({ error: "A valid topic is required." });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate 10 trivia questions about: ${topic.trim()}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
    });

    const raw = completion.choices[0].message.content.trim();

    // Strip markdown code fences if model wraps in them
    const cleaned = raw.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();

    let questions;
    try {
      questions = JSON.parse(cleaned);
    } catch {
      console.error("JSON parse failed. Raw response:\n", raw);
      return res.status(500).json({ error: "Failed to parse trivia from AI response." });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(500).json({ error: "Unexpected response format from AI." });
    }

    return res.json({ topic: topic.trim(), questions });
  } catch (err) {
    console.error("Groq API error:", err.message);
    return res.status(500).json({ error: "Failed to generate trivia. Please try again." });
  }
});

module.exports = router;
