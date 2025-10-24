import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

interface PromptGeneratorProps {
  projectId: string | null;
  onCodeGenerated: (code: string) => void;
}

export const PromptGenerator = ({ projectId, onCodeGenerated }: PromptGeneratorProps) => {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const generateCode = async () => {
    if (!projectId || !prompt.trim()) {
      toast({ variant: "destructive", title: "Please select a project and enter a prompt" });
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-code", {
        body: { projectId, prompt }
      });

      if (error) throw error;

      onCodeGenerated(data.code);
      toast({ title: "Code generated successfully!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Generation failed" });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe what you want to build... (e.g., 'Create a user dashboard with charts and data tables')"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        className="resize-none"
      />
      <Button onClick={generateCode} disabled={generating || !projectId} className="w-full">
        {generating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate with AI
          </>
        )}
      </Button>
    </div>
  );
};
