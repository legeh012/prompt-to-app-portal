import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { Zap, Play } from "lucide-react";
import babHeroImage from "@/assets/bab-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-space-gray to-background opacity-90" />
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-neon-cyan text-neon-cyan px-4 py-2 text-sm font-semibold floating-animation">
                🚀 Next-Gen App Builder
              </Badge>
              <h1 id="hero-heading" className="text-6xl lg:text-7xl font-bold leading-tight">
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
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="neon" size="lg" className="text-lg px-8 py-6" aria-label="Start building your app for free">
                  <Zap className="mr-2" />
                  Start Building Free
                </Button>
                <Button variant="neon-outline" size="lg" className="text-lg px-8 py-6" aria-label="Watch product demo video">
                  <Play className="mr-2" />
                  Watch Demo
                </Button>
              </div>
              
              <div className="max-w-sm">
                <GoogleSignInButton />
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="glass-card p-8 floating-animation">
              <img 
                src={babHeroImage} 
                alt="BAB BestAppBuilder - Futuristic AI-powered app creation interface showing drag-and-drop components and live preview"
                className="w-full rounded-lg shadow-2xl"
                loading="lazy"
                width="600"
                height="400"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full animate-pulse opacity-60" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-neon-cyan to-neon-green rounded-full animate-pulse opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};