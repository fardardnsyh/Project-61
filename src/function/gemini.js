const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

async function callGemini(prompt) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

module.exports = callGemini;
