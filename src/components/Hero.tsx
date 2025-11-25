import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import logo from "@/assets/logo-sol.png";

export const Hero = () => {
  const scrollToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-solar-lightBlue via-primary to-solar-blue">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-solar-yellow/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-solar-orange/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center text-primary-foreground">
          {/* Logo */}
          <img src={logo} alt="Sol Logo" className="w-32 h-32 mb-8 drop-shadow-2xl" />
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <Zap className="w-4 h-4 text-solar-yellow" />
            <span className="text-sm font-medium">Energia Solar Acessível para Todos</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight">
            Sua Conta de Luz{" "}
            <span className="text-solar-yellow">Mais Barata</span>{" "}
            Desde o Primeiro Mês
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-primary-foreground/90">
            Financiamento solar sem burocracia, usando seu histórico de pagamento de energia como garantia.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-3xl w-full">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-solar-yellow mb-2">-70%</div>
              <div className="text-sm text-primary-foreground/80">Economia Média</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-solar-yellow mb-2">25 anos</div>
              <div className="text-sm text-primary-foreground/80">Garantia</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-solar-yellow mb-2">0 dias</div>
              <div className="text-sm text-primary-foreground/80">Para Começar</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={scrollToSimulator}
              className="bg-solar-yellow hover:bg-solar-orange text-foreground font-semibold px-8 py-6 text-lg rounded-full shadow-2xl transition-all hover:scale-105"
            >
              Simular Minha Economia
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-primary-foreground hover:bg-white/20 px-8 py-6 text-lg rounded-full"
            >
              Ver Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
