import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingBag, Zap } from "lucide-react";

interface Purchase {
  id: string;
  transaction_hash: string;
  amount_kwh: number;
  block_timestamp: string;
  metadata: any;
  status: string;
}

export const MyPurchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalKwh, setTotalKwh] = useState(0);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .eq('to_user_id', userData.user.id)
        .eq('transaction_type', 'transfer')
        .order('block_timestamp', { ascending: false });

      if (error) throw error;
      
      setPurchases(data || []);
      
      // Calculate total kWh purchased
      const total = (data || []).reduce((sum, purchase) => sum + parseFloat(purchase.amount_kwh.toString()), 0);
      setTotalKwh(total);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Minhas Compras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Energia</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalKwh.toFixed(2)} kWh</div>
            <p className="text-xs text-muted-foreground">
              Créditos de energia adquiridos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Compras</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchases.length}</div>
            <p className="text-xs text-muted-foreground">
              Tokens de energia comprados
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Compras</CardTitle>
          <CardDescription>
            Suas aquisições de tokens de energia
          </CardDescription>
        </CardHeader>
        <CardContent>
          {purchases.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Você ainda não fez nenhuma compra</p>
              <p className="text-sm">Visite o marketplace para adquirir tokens</p>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">
                        {purchase.metadata?.farm_name || 'Fazenda Solar'}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {purchase.transaction_hash}
                      </p>
                    </div>
                    <Badge variant={purchase.status === 'confirmed' ? 'default' : 'secondary'}>
                      {purchase.status === 'confirmed' ? 'Confirmado' : purchase.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Energia</p>
                      <p className="font-semibold">{purchase.amount_kwh} kWh</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Valor Pago</p>
                      <p className="font-semibold">
                        R$ {purchase.metadata?.purchase_price 
                          ? parseFloat(purchase.metadata.purchase_price).toFixed(2)
                          : '-'}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data</p>
                      <p className="font-semibold">
                        {new Date(purchase.block_timestamp).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  {purchase.metadata?.token_identifier && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-muted-foreground">
                        Token ID: <span className="font-mono">{purchase.metadata.token_identifier}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
