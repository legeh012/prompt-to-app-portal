import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="container mx-auto px-4 py-20" aria-labelledby="cta-heading">
      <Card className="glass-card p-12 text-center">
        <CardContent className="space-y-6">
          <h2 id="cta-heading" className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Ready to Build the Future?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who are already building tomorrow's apps with BAB today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="neon" size="lg" className="text-lg px-8 py-6" aria-label="Start creating your app now">
              <Sparkles className="mr-2" />
              Start Creating Now
            </Button>
            <Button variant="glass" size="lg" className="text-lg px-8 py-6" aria-label="Learn more about BAB features">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};