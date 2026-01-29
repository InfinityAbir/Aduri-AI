import Groq from "groq-sdk";
import { detectLanguage } from "../utils/language.js";

let groqClient = null;

function getGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing");
  }

  if (!groqClient) {
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  return groqClient;
}

export async function generateReply(message, history = []) {
  const groq = getGroqClient();
  const lang = detectLanguage(message);

  const systemPrompt =
    lang === "bn"
      ? `
তুমি Aduri, একজন অভিজ্ঞ নারী AI মেন্টর।
তুমি Computer Science & Engineering বিষয়ে গভীরভাবে পারদর্শী।
ধাপে ধাপে ব্যাখ্যা করো, প্রয়োজনে উদাহরণ দাও।
শিক্ষার্থীকে বুঝতে সাহায্য করাই তোমার মূল লক্ষ্য।
`
      : `
You are Aduri, an experienced female AI mentor.
You specialize in Computer Science and Engineering.
Explain concepts step by step, with examples when helpful.
Your goal is to teach, not just answer.
`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: message },
  ];

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    temperature: 0.4,
  });

  return completion.choices[0].message.content;
}
