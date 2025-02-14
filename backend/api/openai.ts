import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Missing message in request body" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 150,
    });

    const reply = response.choices[0]?.message?.content;
    if (!reply) {
      return res.status(500).json({ error: "No answer returned from OpenAI" });
    }
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    if (error.response && error.response.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    }
    return res.status(500).json({
      error:
        error.response?.data?.error?.message ||
        "Failed to get response from OpenAI",
    });
  }
}
