import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, Lightbulb, DollarSign } from "lucide-react";

export const SimulatorSection = () => {
  const [consumption, setConsumption] = useState(450);
  
  const avgTariff = 0.78;
  const systemSize = Math.ceil(consumption / 100);
  const generation = systemSize * 100;
  const currentBill = consumption * avgTariff;
  const billWithSolar = currentBill * 0.22; // 78% reduction
  const monthlySavings = currentBill - billWithSolar;
  const yearlySavings = monthlySavings * 12;
  const savings25Years = yearlySavings * 25;
  const systemCost = systemSize * 5000;
  const installments = 180;
  const monthlyPayment = systemCost * 0.0079; // 5.5% a.a. approximation

  return (
    <section id="simulator" className="py-24 bg-gradient-to-br from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Simulador Gratuito</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Calcule Sua <span className="text-primary">Economia</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra quanto você pode economizar com energia solar
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Card */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Seus Dados de Consumo</CardTitle>
                <CardDescription>
                  Informe seu consumo mensal médio em kWh (encontre na sua conta de luz)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="consumption" className="text-lg">Consumo Mensal (kWh)</Label>
                  <div className="relative">
                    <Lightbulb className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="consumption"
                      type="number"
                      value={consumption}
                      onChange={(e) => setConsumption(Number(e.target.value))}
                      className="pl-12 text-lg h-14"
                      min="100"
                      max="2000"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consumo médio residencial: 150-500 kWh/mês
                  </p>
                </div>

                <div className="bg-muted/50 rounded-xl p-6 space-y-3">
                  <h3 className="font-semibold text-lg mb-4">Sistema Recomendado</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Potência Instalada</span>
                    <span className="font-bold text-xl">{systemSize} kWp</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Geração Esperada</span>
                    <span className="font-bold text-xl">{generation} kWh/mês</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tarifa Média</span>
                    <span className="font-bold text-xl">R$ {avgTariff.toFixed(2)}/kWh</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Card */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-accent" />
                  Sua Economia com Sol
                </CardTitle>
                <CardDescription>Cenário: Eu Gero</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Bills Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-xl p-4 border">
                    <p className="text-sm text-muted-foreground mb-1">Conta Atual</p>
                    <p className="text-2xl font-bold text-destructive">
                      R$ {currentBill.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-background rounded-xl p-4 border border-accent/50">
                    <p className="text-sm text-muted-foreground mb-1">Conta com Solar</p>
                    <p className="text-2xl font-bold text-accent">
                      R$ {billWithSolar.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Savings */}
                <div className="space-y-4">
                  <div className="bg-accent/10 rounded-xl p-6 border border-accent/30">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-accent" />
                      <span className="font-semibold">Economia Mensal</span>
                    </div>
                    <p className="text-3xl font-bold text-accent">
                      R$ {monthlySavings.toFixed(2)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background rounded-xl p-4 border">
                      <p className="text-sm text-muted-foreground mb-1">Economia Anual</p>
                      <p className="text-xl font-bold text-accent">
                        R$ {yearlySavings.toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <div className="bg-background rounded-xl p-4 border">
                      <p className="text-sm text-muted-foreground mb-1">Em 25 anos</p>
                      <p className="text-xl font-bold text-accent">
                        R$ {savings25Years.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Financing */}
                <div className="bg-primary/10 rounded-xl p-6 border border-primary/30">
                  <h4 className="font-semibold mb-4">Condições de Financiamento</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor do Sistema</span>
                      <span className="font-bold">R$ {systemCost.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa de Juros</span>
                      <span className="font-bold">5,5% a.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Parcelas</span>
                      <span className="font-bold">{installments}x</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-muted-foreground">Valor da Parcela</span>
                      <span className="text-2xl font-bold text-primary">
                        R$ {monthlyPayment.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Solicitar Proposta Personalizada
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
