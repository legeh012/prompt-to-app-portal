import { callLLM } from "../services/llmService";

export interface BotRequest {
  message: string;
  projectContext?: object;
  userId?: number;
}

export async function aiBotAgent(request: BotRequest): Promise<string> {
  const prompt = `
    You are an AI assistant for app builders. 
    Respond conversationally and generate code, project suggestions, or technical answers.
    User request: ${request.message}
    Project context: ${JSON.stringify(request.projectContext || {})}
  `;
  const response = await callLLM({ prompt, model: "gpt-4" });
  return response;
}