import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, FileText, TrendingDown, Shield, Wrench } from "lucide-react";

export const TrilhasSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Escolha Sua <span className="text-primary">Trilha Solar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Três soluções completas de energia solar para você
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Eu Gero */}
          <Card className="relative overflow-hidden border-2 hover:border-primary transition-all hover:shadow-xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-solar-yellow to-solar-orange opacity-10 rounded-bl-full" />
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-3xl">Eu Gero</CardTitle>
              <CardDescription className="text-lg">Para proprietários de imóveis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Instalação de painéis</strong> no seu telhado
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Financiamento facilitado</strong> com base no seu histórico de pagamento
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Parcelas na conta de luz</strong>, sem complicação
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Economia até 70%</strong> na conta de energia
                  </p>
                </div>
              </div>

              <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-accent">Economia Estimada</span>
                </div>
                <p className="text-2xl font-bold">R$ 273/mês</p>
                <p className="text-sm text-muted-foreground">Baseado em 450 kWh de consumo</p>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                Quero Gerar Minha Energia
              </Button>
            </CardContent>
          </Card>

          {/* Eu Assino */}
          <Card className="relative overflow-hidden border-2 hover:border-solar-green transition-all hover:shadow-xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-solar-green to-primary opacity-10 rounded-bl-full" />
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-3xl">Eu Assino</CardTitle>
              <CardDescription className="text-lg">Para inquilinos e não proprietários</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Energia de fazenda solar</strong>, sem obras
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Sem investimento inicial</strong>, comece imediatamente
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Créditos direto na conta</strong> da distribuidora
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">10-15% de desconto garantido</strong> todo mês
                  </p>
                </div>
              </div>

              <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-accent">Flexibilidade Total</span>
                </div>
                <p className="text-2xl font-bold">Sem Fidelidade</p>
                <p className="text-sm text-muted-foreground">Cancele quando quiser, sem multas</p>
              </div>

              <Button className="w-full bg-accent hover:bg-accent/90" size="lg">
                Quero Assinar Energia
              </Button>
            </CardContent>
          </Card>

          {/* Eu Instalo */}
          <Card className="relative overflow-hidden border-2 hover:border-solar-blue transition-all hover:shadow-xl group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-solar-blue to-primary opacity-10 rounded-bl-full" />
            <CardHeader>
              <div className="w-12 h-12 bg-solar-blue/10 rounded-xl flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-solar-blue" />
              </div>
              <CardTitle className="text-3xl">Eu Instalo</CardTitle>
              <CardDescription className="text-lg">Para instaladores e técnicos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-solar-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-solar-blue" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Treinamento completo</strong> em instalação solar
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-solar-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-solar-blue" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Certificação profissional</strong> reconhecida
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-solar-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-solar-blue" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Gestão de projetos</strong> e logística
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-solar-blue/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-solar-blue" />
                  </div>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Rede de oportunidades</strong> de trabalho
                  </p>
                </div>
              </div>

              <div className="bg-solar-blue/10 rounded-xl p-4 border border-solar-blue/20">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-5 h-5 text-solar-blue" />
                  <span className="font-semibold text-solar-blue">Profissional Qualificado</span>
                </div>
                <p className="text-2xl font-bold">Certificado</p>
                <p className="text-sm text-muted-foreground">Seja um instalador autorizado</p>
              </div>

              <Button className="w-full bg-solar-blue hover:bg-solar-blue/90 text-white" size="lg">
                Quero Me Tornar Instalador
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
