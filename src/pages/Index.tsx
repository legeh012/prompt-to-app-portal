import { SkipNavigation } from "@/components/ui/SkipNavigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AppBuilderSection } from "@/components/sections/AppBuilderSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <>
      <SkipNavigation />
      <div className="min-h-screen grid-pattern">
        <main id="main-content">
          <HeroSection />
          <AppBuilderSection />
          <FeaturesSection />
          <CTASection />
        </main>
      </div>
    </>
  );
};

export default Index;