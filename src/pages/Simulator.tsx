import { SimulatorSection } from "@/components/SimulatorSection";

const Simulator = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Simulador de Economia</h1>
          <p className="text-muted-foreground">Descubra quanto você pode economizar com energia solar</p>
        </div>
        
        <SimulatorSection />
      </div>
    </div>
  );
};

export default Simulator;
