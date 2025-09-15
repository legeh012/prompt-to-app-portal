import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Play, Globe, Smartphone, Sparkles, Code } from "lucide-react";

export const AppBuilderSection = () => {
  const [appIdea, setAppIdea] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!appIdea.trim()) return;
    
    setIsGenerating(true);
    // Simulate app generation process
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <section className="container mx-auto px-4 py-20" aria-labelledby="builder-heading">
      <div className="text-center mb-12">
        <h2 id="builder-heading" className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
            Prompt-to-Reality
          </span>
        </h2>
        <p className="text-xl text-muted-foreground">
          Describe your vision and watch it transform into a working app
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Input Panel */}
        <Card className="glass-card p-6">
          <CardHeader>
            <CardTitle className="text-2xl text-neon-cyan">Describe Your App</CardTitle>
            <CardDescription className="text-lg">
              Tell BAB what you want to build. Be as detailed or as simple as you like.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="app-name" className="sr-only">App name</label>
                <Input 
                  id="app-name"
                  placeholder="App name (e.g., TaskMaster Pro)"
                  className="glass-card border-neon-purple/30 text-lg p-4"
                  aria-label="Enter your app name"
                />
              </div>
              <div>
                <label htmlFor="app-description" className="sr-only">App description</label>
                <Textarea 
                  id="app-description"
                  placeholder="Describe your app idea in detail... 

Example: Create a task management app with AI-powered scheduling, team collaboration features, real-time notifications, and a beautiful dark theme with productivity analytics dashboard."
                  value={appIdea}
                  onChange={(e) => setAppIdea(e.target.value)}
                  className="glass-card border-neon-purple/30 min-h-[200px] text-lg p-4 resize-none"
                  aria-label="Describe your app idea in detail"
                />
              </div>
            </div>
            
            <Button 
              variant="neon" 
              size="lg" 
              onClick={handleGenerate}
              disabled={!appIdea.trim() || isGenerating}
              className="w-full text-lg py-6"
              aria-label={isGenerating ? "Generating your app, please wait" : "Generate app from description"}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin mr-2 h-5 w-5 border-2 border-space-dark border-t-transparent rounded-full" />
                  Generating App...
                </>
              ) : (
                <>
                  <ArrowRight className="mr-2" />
                  Generate App
                </>
              )}
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="neon-ghost" className="text-sm" aria-label="Generate mobile app">
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile App
              </Button>
              <Button variant="neon-ghost" className="text-sm" aria-label="Generate web app">
                <Globe className="mr-2 h-4 w-4" />
                Web App
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className="glass-card p-6">
          <CardHeader>
            <CardTitle className="text-2xl text-neon-purple">Live Preview</CardTitle>
            <CardDescription className="text-lg">
              Watch your app come to life in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/5] bg-gradient-to-br from-space-dark to-space-gray rounded-lg border border-neon-cyan/20 flex items-center justify-center" role="img" aria-label="App preview area">
              {isGenerating ? (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full animate-pulse" />
                  <p className="text-neon-cyan animate-pulse">Building your app...</p>
                </div>
              ) : appIdea ? (
                <div className="text-center space-y-4 p-8">
                  <Sparkles className="w-16 h-16 mx-auto text-neon-purple animate-pulse" />
                  <p className="text-muted-foreground">Click "Generate App" to see the magic happen</p>
                </div>
              ) : (
                <div className="text-center space-y-4 p-8">
                  <Code className="w-16 h-16 mx-auto text-muted-foreground/50" />
                  <p className="text-muted-foreground">Start by describing your app idea</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};