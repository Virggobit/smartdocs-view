import { DashboardSection } from "@/components/DashboardSection";
import { CooperativeTermSignature } from "@/components/CooperativeTermSignature";
import { NextActions } from "@/components/NextActions";
import { StatusBadge } from "@/components/StatusBadge";
import { useUserRole } from "@/hooks/useUserRole";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Store, BookOpen, Zap, FileSignature, TrendingUp, Sun, Wallet } from "lucide-react";

const Dashboard = () => {
  const { roles } = useUserRole();
  const isClienteAssino = roles.includes('cliente_assino');
  const isClienteGero = roles.includes('cliente_gero');
  const isCliente = isClienteAssino || isClienteGero;

  const clienteAssinoActions = [
    { title: "Assinar Termo de Adesão", description: "Documento ANEEL obrigatório para acessar sua cooperativa", href: "/dashboard", icon: FileSignature },
    { title: "Explorar Marketplace", description: "Compre tokens de kWh das fazendas solares", href: "/marketplace", icon: Store },
    { title: "Simular sua Economia", description: "Veja quanto pode economizar como assinante", href: "/simulador", icon: Calculator },
    { title: "Conhecer as Trilhas", description: "Entenda como funciona o modelo PAYS", href: "/trilhas", icon: BookOpen },
  ];

  const clienteGeroActions = [
    { title: "Conectar Conta de Energia", description: "Suba sua fatura para análise de crédito", href: "/conectar-energia", icon: Zap },
    { title: "Simular sua Instalação", description: "Dimensione seu sistema solar próprio", href: "/simulador", icon: Calculator },
    { title: "Acompanhar Economia", description: "Veja o retorno do seu investimento", href: "/dashboard", icon: TrendingUp },
    { title: "Trilhas de Aprendizado", description: "Aprenda sobre o programa Sol F", href: "/trilhas", icon: BookOpen },
  ];

  if (isCliente) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {isClienteAssino ? 'Minha Cooperativa' : 'Meu Painel Solar'}
              </h1>
              <p className="text-muted-foreground">
                {isClienteAssino
                  ? 'Assine o termo de adesão e comece a economizar com energia solar'
                  : 'Acompanhe sua jornada de geração solar e economia'}
              </p>
            </div>
            <StatusBadge
              tone={isClienteAssino ? "pending" : "success"}
              label={isClienteAssino ? "Aguardando assinatura" : "Conta ativa"}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Economia Estimada</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.240,00</div>
                <p className="text-xs text-muted-foreground">Acumulada nos últimos 12 meses</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Energia {isClienteAssino ? 'Recebida' : 'Gerada'}</CardTitle>
                <Sun className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">480 kWh</div>
                <p className="text-xs text-muted-foreground">Este mês</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score Sol F</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">782</div>
                <p className="text-xs text-muted-foreground">Histórico de pagamento de energia</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Próxima Parcela</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 168,00</div>
                <p className="text-xs text-muted-foreground">Sempre menor que sua economia (PAYS)</p>
              </CardContent>
            </Card>
          </div>

          <NextActions actions={isClienteAssino ? clienteAssinoActions : clienteGeroActions} />

          {isClienteAssino ? (
            <Tabs defaultValue="termo" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="termo">Termo de Adesão</TabsTrigger>
                <TabsTrigger value="dashboard">Meus Dados</TabsTrigger>
              </TabsList>
              <TabsContent value="termo" className="mt-6">
                <CooperativeTermSignature />
              </TabsContent>
              <TabsContent value="dashboard" className="mt-6">
                <DashboardSection />
              </TabsContent>
            </Tabs>
          ) : (
            <DashboardSection />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Analytics</h1>
          <p className="text-muted-foreground">Acompanhe o desempenho da plataforma Sol</p>
        </div>
        <DashboardSection />
      </div>
    </div>
  );
};

export default Dashboard;
