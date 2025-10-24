import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, User, Bot, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatBoxProps {
  projectId: string | null;
  onCodeGenerated?: (code: string) => void;
}

export const AIChatBox = ({ projectId, onCodeGenerated }: AIChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI coding assistant. I can help you build features, fix bugs, refactor code, and answer questions. What would you like to work on?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !projectId) {
      toast({ 
        variant: "destructive", 
        title: "Please select a project and enter a message" 
      });
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke("ai-chat-assistant", {
        body: { 
          projectId, 
          message: input,
          conversationHistory: messages.slice(-6) // Last 6 messages for context
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (data.code && onCodeGenerated) {
        onCodeGenerated(data.code);
      }

      if (data.code) {
        toast({ title: "Code generated successfully!" });
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({ 
        variant: "destructive", 
        title: "Failed to process message",
        description: "Please try again"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-60 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isProcessing && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask me anything... (e.g., 'Add a login form', 'Fix the navigation bug', 'Explain this code')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isProcessing || !projectId}
              rows={2}
              className="resize-none"
            />
            <Button
              onClick={sendMessage}
              disabled={isProcessing || !projectId || !input.trim()}
              size="icon"
              className="h-auto"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
