import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Network, Zap, Users, TrendingUp, Coins } from "lucide-react";
import { MintTokenForm } from "@/components/MintTokenForm";
import { TokensList } from "@/components/TokensList";
import { TransactionHistory } from "@/components/TransactionHistory";

const DistribuidorDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTokenCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Dashboard Gestor de Distribuição
          </h1>
          <p className="text-muted-foreground">Gestão de fazendas solares e tokenização de créditos</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Créditos Distribuídos
              </CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.320 kWh</div>
              <p className="text-xs text-muted-foreground">
                +18% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Fazendas Ativas
              </CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                2 novas neste trimestre
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Assinantes Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                67 novos neste mês
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Receita Mensal
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 89.450</div>
              <p className="text-xs text-muted-foreground">
                +22% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tokenize" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tokenize" className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              Tokenização
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Network className="w-4 h-4" />
              Blockchain
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tokenize" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <MintTokenForm onSuccess={handleTokenCreated} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Como Funciona a Tokenização</CardTitle>
                  <CardDescription>
                    Sistema baseado em blockchain para gestão transparente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Criação (Mint)</h4>
                      <p className="text-sm text-muted-foreground">
                        Gere tokens representando kWh produzidos por suas fazendas solares
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Rastreabilidade</h4>
                      <p className="text-sm text-muted-foreground">
                        Cada token tem hash único e registro imutável na blockchain
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Distribuição</h4>
                      <p className="text-sm text-muted-foreground">
                        Tokens podem ser vendidos/transferidos para clientes no marketplace
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
                    <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                      💡 Transparência Total
                    </p>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                      Todas as transações são registradas permanentemente e podem ser auditadas a qualquer momento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tokens">
            <TokensList refresh={refreshKey} />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory refresh={refreshKey} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DistribuidorDashboard;
