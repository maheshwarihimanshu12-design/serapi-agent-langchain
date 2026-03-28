import { config } from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { initializeAgentExecutorWithOptions } from "@langchain/classic/agents";
import { SerpAPI } from "@langchain/community/tools/serpapi";

config();

const model = new ChatGoogleGenerativeAI({
  maxOutputTokens: 1067,
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.9,
  model: "gemini-2.5-flash",
});

const searchTool = new SerpAPI(process.env.SERPAPI_API_KEY, {
  location: "Canada",
  hl: "en",
  gl: "ca",
});

const executor = await initializeAgentExecutorWithOptions([searchTool], model, {
  agentType: "zero-shot-react-description",
  verbose: true,
});

const input = "What is the current weather in New York City?";
const result = await executor.invoke({ input });

console.log(result);
