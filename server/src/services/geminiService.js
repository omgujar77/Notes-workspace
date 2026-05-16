import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

console.log("KEY:", process.env.GEMINI_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

export const summarizeNote = async (content) => {
  try {

    if (!content || content.trim() === "") {
      throw new Error("Note content is empty");
    }

    const prompt = `
Return ONLY valid JSON.

{
  "summary": "short summary",
  "action_items": ["item1", "item2"],
  "suggested_title": "title"
}

Note:
${content}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {

      return JSON.parse(text);

    } catch {

      return {
        summary: text,
        action_items: [],
        suggested_title: "AI Generated Note",
      };
    }

  } catch (error) {

    console.log("Gemini Error:", error);

    throw new Error("AI summary failed");
  }
};