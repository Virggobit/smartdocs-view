import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingDown, Zap, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyGrowth = [
  { month: "Jun", clients: 120 },
  { month: "Jul", clients: 185 },
  { month: "Ago", clients: 245 },
  { month: "Set", clients: 320 },
  { month: "Out", clients: 410 },
  { month: "Nov", clients: 520 },
];

const recentAccounts = [
  { name: "Maria Silva", cpf: "***.***.123-45", trilha: "Eu Gero", status: "Ativo", date: "20/11/2025" },
  { name: "João Santos", cpf: "***.***.678-90", trilha: "Eu Assino", status: "Aprovado", date: "19/11/2025" },
  { name: "Ana Costa", cpf: "***.***.234-56", trilha: "Eu Gero", status: "Instalando", date: "18/11/2025" },
  { name: "Carlos Ferreira", cpf: "***.***.456-78", trilha: "Eu Instalo", status: "Ativo", date: "18/11/2025" },
  { name: "Pedro Oliveira", cpf: "***.***.789-01", trilha: "Eu Assino", status: "Análise", date: "18/11/2025" },
  { name: "Banco do Brasil", cpf: "***.***.345-67", trilha: "Eu Financio", status: "Ativo", date: "17/11/2025" },
  { name: "Cooperativa Solar PA", cpf: "***.***.890-12", trilha: "Eu Distribuo", status: "Ativo", date: "17/11/2025" },
  { name: "Carla Souza", cpf: "***.***.345-67", trilha: "Eu Gero", status: "Aprovado", date: "16/11/2025" },
];

const trilhaData = [
  { name: "Eu Gero", value: 340, color: "hsl(203, 89%, 30%)" },
  { name: "Eu Assino", value: 180, color: "hsl(142, 71%, 45%)" },
  { name: "Eu Instalo", value: 95, color: "hsl(48, 96%, 53%)" },
  { name: "Eu Financio", value: 68, color: "hsl(142, 76%, 36%)" },
  { name: "Eu Distribuo", value: 52, color: "hsl(271, 91%, 65%)" },
];

const statusColors: Record<string, string> = {
  "Ativo": "text-accent bg-accent/10 border-accent/20",
  "Aprovado": "text-primary bg-primary/10 border-primary/20",
  "Instalando": "text-solar-yellow bg-solar-yellow/10 border-solar-yellow/20",
  "Análise": "text-muted-foreground bg-muted border-border",
};

export const DashboardSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Dashboard <span className="text-primary">Analytics</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visão completa do impacto da Sol no setor de energia solar
          </p>
        </div>

        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 hover:border-primary/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">520</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-accent" />
                +26.8% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Economia Total Gerada</CardTitle>
              <TrendingDown className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ 142k</div>
              <p className="text-xs text-muted-foreground mt-1">
                Por mês para todos os clientes
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-solar-yellow/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energia Instalada</CardTitle>
              <Zap className="h-5 w-5 text-solar-yellow" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.7 MWp</div>
              <p className="text-xs text-muted-foreground mt-1">
                Capacidade total instalada
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-solar-green/50 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Inadimplência</CardTitle>
              <AlertTriangle className="h-5 w-5 text-solar-green" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.2%</div>
              <p className="text-xs text-muted-foreground mt-1">
                85% abaixo da média do setor
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Growth Chart */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Crescimento de Clientes</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clients" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Trilha Distribution */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Distribuição por Trilhas</CardTitle>
              <CardDescription>Todas as modalidades da plataforma Sol</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trilhaData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {trilhaData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                <div className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-2xl font-bold text-primary">340</div>
                  <div className="text-sm text-muted-foreground">Eu Gero</div>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="text-2xl font-bold text-accent">180</div>
                  <div className="text-sm text-muted-foreground">Eu Assino</div>
                </div>
                <div className="text-center p-3 bg-solar-yellow/10 rounded-lg border border-solar-yellow/20">
                  <div className="text-2xl font-bold text-solar-yellow">95</div>
                  <div className="text-sm text-muted-foreground">Eu Instalo</div>
                </div>
                <div className="text-center p-3 bg-green-600/10 rounded-lg border border-green-600/20">
                  <div className="text-2xl font-bold text-green-600">68</div>
                  <div className="text-sm text-muted-foreground">Eu Financio</div>
                </div>
                <div className="text-center p-3 bg-purple-600/10 rounded-lg border border-purple-600/20">
                  <div className="text-2xl font-bold text-purple-600">52</div>
                  <div className="text-sm text-muted-foreground">Eu Distribuo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Accounts Table */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Últimas Contas Criadas</CardTitle>
            <CardDescription>10 cadastros mais recentes no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-sm">Cliente</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">CPF</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Trilha</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAccounts.map((account, index) => (
                    <tr key={index} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{account.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{account.cpf}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                          account.trilha === "Eu Gero" 
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : account.trilha === "Eu Instalo"
                            ? "bg-solar-yellow/10 text-solar-yellow border border-solar-yellow/20"
                            : account.trilha === "Eu Assino"
                            ? "bg-accent/10 text-accent border border-accent/20"
                            : account.trilha === "Eu Financio"
                            ? "bg-green-600/10 text-green-600 border border-green-600/20"
                            : "bg-purple-600/10 text-purple-600 border border-purple-600/20"
                        }`}>
                          {account.trilha}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${statusColors[account.status]}`}>
                          {account.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {account.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
