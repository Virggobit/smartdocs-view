import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TokenMarketplace } from "@/components/TokenMarketplace";
import { MyPurchases } from "@/components/MyPurchases";
import { MarketplaceFilters, FilterOptions } from "@/components/MarketplaceFilters";
import { Store, ShoppingBag } from "lucide-react";

const Marketplace = () => {
  const [filters, setFilters] = useState<FilterOptions | undefined>(undefined);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Marketplace de Energia Solar
          </h1>
          <p className="text-muted-foreground">
            Compre créditos de energia tokenizados diretamente das cooperativas
          </p>
        </div>

        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Minhas Compras
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800 mb-6">
              <h3 className="text-lg font-semibold mb-2">Como funciona?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1">1. Escolha seu token</p>
                  <p className="text-muted-foreground">
                    Selecione tokens de energia de cooperativas verificadas
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">2. Compre com segurança</p>
                  <p className="text-muted-foreground">
                    Transação registrada na blockchain de forma transparente
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">3. Economize na conta</p>
                  <p className="text-muted-foreground">
                    Créditos aplicados automaticamente na sua fatura
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <MarketplaceFilters 
                  onFilterChange={handleFilterChange}
                  onReset={handleResetFilters}
                />
              </div>
              
              <div className="lg:col-span-3">
                <TokenMarketplace filters={filters} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="purchases">
            <MyPurchases />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Marketplace;
