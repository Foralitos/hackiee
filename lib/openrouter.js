import OpenAI from "openai";

// OpenRouter is OpenAI-API-compatible. We point the SDK at openrouter.ai and
// route every model call (vision, chat, completion) through the same client.

let client = null;

export function getOpenRouter() {
  if (client) return client;
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      "Missing OPENROUTER_API_KEY — add it to .env.local"
    );
  }
  client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      // OpenRouter recommends sending these so the request shows up nicely
      // in their dashboard. Both are optional.
      "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
      "X-Title": "PREP Copilot",
    },
  });
  return client;
}

export const DEFAULT_OCR_MODEL =
  process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash";
