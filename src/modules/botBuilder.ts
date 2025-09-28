import { featureFlags } from "./featureFlags";
import { aiBotAgent } from "./aiAgent";

export async function buildBot(plan: string, options: { useAI?: boolean } = {}) {
  if (featureFlags.newAIBuilder && options.useAI) {
    // Use AI agent for bot building
    return {
      code: await aiBotAgent({ message: plan }),
      config: { method: "ai" }
    };
  }
  // Legacy bot builder logic
  return {
    code: "// legacy bot code based on plan",
    config: { method: "legacy" }
  };
}