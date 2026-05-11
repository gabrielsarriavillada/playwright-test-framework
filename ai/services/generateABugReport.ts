import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type GenerateAIBugReportInput = {
  prompt: string;
};

export async function generateAIBugReport({
  prompt,
}: GenerateAIBugReportInput): Promise<string> {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a Senior QA Engineer specialized in Playwright and test automation.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  return response.choices[0]?.message?.content ?? "No AI response generated.";
}
