import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Code, Globe, Smartphone, Bot, ArrowRight, Play } from "lucide-react";
import babHeroImage from "@/assets/bab-hero.jpg";

const Index = () => {
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

  const features = [
    {
      icon: Sparkles,
      title: "AI-Driven Creation",
      description: "Transform your ideas into apps with advanced AI technology",
      gradient: "from-neon-cyan to-neon-purple"
    },
    {
      icon: Code,
      title: "No-Code Builder",
      description: "Build complex apps without writing a single line of code",
      gradient: "from-neon-purple to-neon-pink"
    },
    {
      icon: Globe,
      title: "Multi-Platform",
      description: "Deploy to web, mobile, and desktop from a single project",
      gradient: "from-neon-pink to-neon-cyan"
    },
    {
      icon: Bot,
      title: "AI Bots Integration",
      description: "Embedded AI agents automate workflows and enhance functionality",
      gradient: "from-neon-green to-neon-cyan"
    }
  ];

  return (
    <div className="min-h-screen grid-pattern">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-space-gray to-background opacity-90" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-neon-cyan text-neon-cyan px-4 py-2 text-sm font-semibold floating-animation">
                  🚀 Next-Gen App Builder
                </Badge>
                <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                    BAB
                  </span>
                  <br />
                  <span className="text-foreground">BestAppBuilder</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  A no-code, AI-driven universe where your ideas transform into fully functional apps, 
                  websites, and bots in minutes. You just describe it — and it comes alive.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="neon" size="lg" className="text-lg px-8 py-6">
                  <Zap className="mr-2" />
                  Start Building Free
                </Button>
                <Button variant="neon-outline" size="lg" className="text-lg px-8 py-6">
                  <Play className="mr-2" />
                  Watch Demo
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-card p-8 floating-animation">
                <img 
                  src={babHeroImage} 
                  alt="BAB - Futuristic App Builder Interface"
                  className="w-full rounded-lg shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full animate-pulse opacity-60" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-neon-cyan to-neon-green rounded-full animate-pulse opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Builder Interface */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
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
                <Input 
                  placeholder="App name (e.g., TaskMaster Pro)"
                  className="glass-card border-neon-purple/30 text-lg p-4"
                />
                <Textarea 
                  placeholder="Describe your app idea in detail... 

Example: Create a task management app with AI-powered scheduling, team collaboration features, real-time notifications, and a beautiful dark theme with productivity analytics dashboard."
                  value={appIdea}
                  onChange={(e) => setAppIdea(e.target.value)}
                  className="glass-card border-neon-purple/30 min-h-[200px] text-lg p-4 resize-none"
                />
              </div>
              
              <Button 
                variant="neon" 
                size="lg" 
                onClick={handleGenerate}
                disabled={!appIdea.trim() || isGenerating}
                className="w-full text-lg py-6"
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
                <Button variant="neon-ghost" className="text-sm">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Mobile App
                </Button>
                <Button variant="neon-ghost" className="text-sm">
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
              <div className="aspect-[4/5] bg-gradient-to-br from-space-dark to-space-gray rounded-lg border border-neon-cyan/20 flex items-center justify-center">
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

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
              Portal to Innovation
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            More than just a builder — it's your gateway to the future
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card p-6 hover:scale-105 transition-all duration-300 floating-animation" style={{ animationDelay: `${index * 0.5}s` }}>
              <CardContent className="text-center space-y-4 pt-6">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} p-4 flex items-center justify-center`}>
                  <feature.icon className="w-8 h-8 text-space-dark" />
                </div>
                <h3 className="text-xl font-semibold text-neon-cyan">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="glass-card p-12 text-center">
          <CardContent className="space-y-6">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Ready to Build the Future?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of creators who are already building tomorrow's apps with BAB today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="neon" size="lg" className="text-lg px-8 py-6">
                <Sparkles className="mr-2" />
                Start Creating Now
              </Button>
              <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;