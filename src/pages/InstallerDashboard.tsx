import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, CheckCircle, Clock } from "lucide-react";

const InstallerDashboard = () => {
  const leads = [
    {
      id: 1,
      name: "João da Silva",
      neighborhood: "Marco",
      creditApproved: 25000,
      status: "Aguardando Orçamento",
      phone: "(91) 98765-4321"
    },
    {
      id: 2,
      name: "Maria Santos",
      neighborhood: "Nazaré",
      creditApproved: 18000,
      status: "Aguardando Orçamento",
      phone: "(91) 98888-1234"
    },
    {
      id: 3,
      name: "Pedro Costa",
      neighborhood: "Umarizal",
      creditApproved: 30000,
      status: "Orçamento Enviado",
      phone: "(91) 99123-4567"
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-8 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Painel do Instalador
              </h1>
              <p className="text-muted-foreground">
                Leads qualificados com crédito pré-aprovado
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Saldo a Receber
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 45.000,00</div>
                  <p className="text-xs text-muted-foreground">
                    3 instalações concluídas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Novos Leads
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    Aguardando orçamento
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Instalações Concluídas
                  </CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    Este mês
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Oportunidades na Sua Região</CardTitle>
                <CardDescription>
                  Clientes com crédito aprovado pelo BB esperando por você
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div 
                      key={lead.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-lg">{lead.name}</p>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {lead.neighborhood}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            Crédito Aprovado: R$ {lead.creditApproved.toLocaleString('pt-BR')}
                          </span>
                          <span>{lead.phone}</span>
                        </div>
                        <Badge 
                          variant={lead.status === "Aguardando Orçamento" ? "default" : "outline"}
                        >
                          {lead.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        {lead.status === "Aguardando Orçamento" && (
                          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                            Enviar Orçamento
                          </button>
                        )}
                        <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default InstallerDashboard;
