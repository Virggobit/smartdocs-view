import { Hero } from "@/components/Hero";
import { TrilhasSection } from "@/components/TrilhasSection";
import { SimulatorSection } from "@/components/SimulatorSection";
import { DashboardSection } from "@/components/DashboardSection";
import { SolBot } from "@/components/SolBot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <TrilhasSection />
      <SimulatorSection />
      <DashboardSection />
      <SolBot />
    </div>
  );
};

export default Index;
