import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectId, message, conversationHistory } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Build conversation context
    const messages = [
      {
        role: "system",
        content: `You are an expert full-stack development assistant with deep knowledge of:
- React, TypeScript, Vite, Tailwind CSS
- Modern web development best practices
- Supabase (database, auth, edge functions)
- UI/UX design patterns
- Debugging and code optimization

Your capabilities:
1. Generate complete, production-ready code
2. Fix bugs and explain issues
3. Refactor and optimize existing code
4. Answer technical questions
5. Provide architectural guidance
6. Suggest best practices

When generating code:
- Write clean, maintainable code
- Include proper TypeScript types
- Use Tailwind CSS for styling with semantic tokens
- Follow React best practices
- Add helpful comments

When the user asks for code changes, respond with:
1. A brief explanation of what you'll do
2. The complete code (if applicable)

Be conversational, helpful, and concise. If you generate code, wrap it in markdown code blocks.`
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: "user",
        content: message
      }
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("AI API error:", error);
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const assistantResponse = data.choices[0].message.content;

    // Extract code if present (between ```typescript or ```tsx blocks)
    const codeBlockRegex = /```(?:typescript|tsx|javascript|jsx)?\n([\s\S]*?)```/;
    const codeMatch = assistantResponse.match(codeBlockRegex);
    const extractedCode = codeMatch ? codeMatch[1] : null;

    return new Response(
      JSON.stringify({ 
        response: assistantResponse,
        code: extractedCode 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
