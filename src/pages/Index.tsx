import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { TrilhasSection } from "@/components/TrilhasSection";
import { SimulatorSection } from "@/components/SimulatorSection";
import { DashboardSection } from "@/components/DashboardSection";
import { SolBot } from "@/components/SolBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="trilhas">
        <TrilhasSection />
      </div>
      <div id="simulator">
        <SimulatorSection />
      </div>
      <div id="dashboard">
        <DashboardSection />
      </div>
      <SolBot />
    </div>
  );
};

export default Index;
