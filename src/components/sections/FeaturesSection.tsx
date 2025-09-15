import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Code, Globe, Bot, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const features: Feature[] = [
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

export const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-20" aria-labelledby="features-heading">
      <div className="text-center mb-12">
        <h2 id="features-heading" className="text-4xl font-bold mb-4">
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
          <Card 
            key={feature.title} 
            className="glass-card p-6 hover:scale-105 transition-all duration-300 floating-animation" 
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <CardContent className="text-center space-y-4 pt-6">
              <div 
                className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} p-4 flex items-center justify-center`}
                role="img"
                aria-label={`${feature.title} icon`}
              >
                <feature.icon className="w-8 h-8 text-space-dark" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-neon-cyan">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};