import { SkipNavigation } from "@/components/ui/SkipNavigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AppBuilderSection } from "@/components/sections/AppBuilderSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <>
      <SkipNavigation />
      <div className="min-h-screen grid-pattern">
        <main id="main-content">
          <HeroSection />
          <div className="container mx-auto px-4 py-8 text-center">
            <Link to="/builder">
              <Button size="lg" className="gap-2">
                Open Builder <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          <AppBuilderSection />
          <FeaturesSection />
          <CTASection />
        </main>
      </div>
    </>
  );
};

export default Index;