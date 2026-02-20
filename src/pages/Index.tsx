import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import AgentsShowcase from "@/components/AgentsShowcase";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="services">
        <ServicesGrid />
      </div>
      <div id="agents">
        <AgentsShowcase />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
