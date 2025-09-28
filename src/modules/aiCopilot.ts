import { callLLM } from "../services/llmService";
import { buildBot } from "./botBuilder";
import { featureFlags } from "./featureFlags";

export async function copilotBuildBot(request: {
  userId: number,
  botSpecs: object,
  isFreeUser: boolean
}) {
  if (featureFlags.aiCopilotFree || request.isFreeUser) {
    const aiPlan = await callLLM({
      prompt: `Design a bot (free tier) with these specs: ${JSON.stringify(request.botSpecs)}`,
      model: "gpt-4"
    });
    const botCode = await buildBot(aiPlan, { useAI: true });
    return { plan: aiPlan, code: botCode.code, config: botCode.config };
  } else {
    throw new Error("Copilot AI is not available on your plan.");
  }
}