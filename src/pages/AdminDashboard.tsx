import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, DollarSign, Users, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Painel Administrativo BB
              </h1>
              <p className="text-muted-foreground">
                Gestão de carteira de crédito e monitoramento de risco
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Crédito Total Aprovado
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 2.450.000,00</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Clientes Ativos
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">
                    +48 novos este mês
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Taxa de Inadimplência
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.3%</div>
                  <p className="text-xs text-muted-foreground">
                    -0.8% vs. crédito tradicional
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Score Médio Sol F
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">782</div>
                  <p className="text-xs text-muted-foreground">
                    Base: histórico de energia
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Análises Pendentes</CardTitle>
                  <CardDescription>
                    Clientes aguardando aprovação de crédito
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Cliente #{1000 + i}</p>
                          <p className="text-sm text-muted-foreground">Score: {750 + i * 10}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm">
                            Aprovar
                          </button>
                          <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                            Revisar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuidoras Conectadas</CardTitle>
                  <CardDescription>
                    Integração On-Bill ativa
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <div>
                        <p className="font-medium">Equatorial Pará</p>
                        <p className="text-sm text-muted-foreground">1.245 clientes</p>
                      </div>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        Ativo
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                      <div>
                        <p className="font-medium">Celpa</p>
                        <p className="text-sm text-muted-foreground">892 clientes</p>
                      </div>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        Ativo
                      </span>
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

export default AdminDashboard;
