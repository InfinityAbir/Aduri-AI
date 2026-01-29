import express from "express";
import { generateReply } from "../services/aiService.js";

const router = express.Router();

/**
 * Chat endpoint
 * Supports:
 * - conversation memory (history)
 * - multilingual input
 */
router.post("/", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    // 🧠 Keep last 10 messages for context
    const trimmedHistory = Array.isArray(history) ? history.slice(-10) : [];

    const reply = await generateReply(message, trimmedHistory);

    res.json({ reply });
  } catch (err) {
    console.error("❌ /chat error:", err);

    res.status(500).json({
      error: "AI generation failed",
      details: err.message,
    });
  }
});

export default router;
