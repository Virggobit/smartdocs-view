import { TrilhasSection } from "@/components/TrilhasSection";

const Trilhas = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Nossas Trilhas</h1>
          <p className="text-muted-foreground">Escolha a melhor opção de energia solar para você</p>
        </div>
        
        <TrilhasSection />
      </div>
    </div>
  );
};

export default Trilhas;
