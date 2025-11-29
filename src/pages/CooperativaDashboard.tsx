import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Users, Zap, TrendingUp } from "lucide-react";

const CooperativaDashboard = () => {
  const allocations = [
    { name: "Maria Oliveira", allocation: 200, savings: 45 },
    { name: "José Santos", allocation: 300, savings: 68 },
    { name: "Ana Costa", allocation: 150, savings: 34 },
    { name: "Pedro Silva", allocation: 250, savings: 57 }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Gestão da Cooperativa
              </h1>
              <p className="text-muted-foreground">
                Administração da Fazenda Solar e alocação de créditos
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Geração Total
                  </CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">10.000 kWh</div>
                  <p className="text-xs text-muted-foreground">
                    Este mês
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Cooperados Ativos
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">
                    +12 novos este mês
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Economia Gerada
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 8.450,00</div>
                  <p className="text-xs text-muted-foreground">
                    Cashback total do mês
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Capacidade Instalada
                  </CardTitle>
                  <Battery className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">450 kWp</div>
                  <p className="text-xs text-muted-foreground">
                    Fazenda Solar Sol do Pará
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Alocação de Créditos Mensal</CardTitle>
                  <CardDescription>
                    Distribuição de energia entre cooperados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {allocations.map((member, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {member.allocation} kWh alocados
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            R$ {member.savings},00
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Economia
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fazendas Solares</CardTitle>
                  <CardDescription>
                    Usinas sob gestão da cooperativa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Fazenda Solar Sol do Pará 1</h3>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                          Operacional
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Capacidade</p>
                          <p className="font-medium">450 kWp</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Localização</p>
                          <p className="font-medium">Belém, PA</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Geração Mensal</p>
                          <p className="font-medium">10.000 kWh</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Cooperados</p>
                          <p className="font-medium">156</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CooperativaDashboard;
