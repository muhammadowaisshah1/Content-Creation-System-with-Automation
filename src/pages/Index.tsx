import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import LiveDemo from "@/components/LiveDemo";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <HowItWorks />
      <LiveDemo />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
