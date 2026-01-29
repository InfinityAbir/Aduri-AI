import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.js";

// --------------------
// ENV SETUP (FIXED)
// --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("ENV PATH:", path.join(__dirname, ".env"));
console.log("GROQ KEY LOADED:", !!process.env.GROQ_API_KEY);

// --------------------
// APP SETUP
// --------------------
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Aduri server running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Aduri server running on http://localhost:${PORT}`);
});
