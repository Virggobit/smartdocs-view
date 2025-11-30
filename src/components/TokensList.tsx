import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Coins, Zap } from "lucide-react";

interface Token {
  id: string;
  token_id: string;
  farm_name: string;
  amount_kwh: number;
  price_per_kwh: number;
  total_value: number;
  status: string;
  created_at: string;
}

export const TokensList = ({ refresh }: { refresh: number }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTokens();
  }, [refresh]);

  const fetchTokens = async () => {
    try {
      const { data, error } = await supabase
        .from('energy_tokens')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTokens(data || []);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: { label: 'Disponível', variant: 'default' as const },
      reserved: { label: 'Reservado', variant: 'secondary' as const },
      sold: { label: 'Vendido', variant: 'outline' as const },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.available;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tokens de Energia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-600" />
          <CardTitle>Tokens de Energia</CardTitle>
        </div>
        <CardDescription>
          {tokens.length} {tokens.length === 1 ? 'token criado' : 'tokens criados'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tokens.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Coins className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum token criado ainda</p>
            <p className="text-sm">Crie seu primeiro token de energia acima</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tokens.map((token) => (
              <div
                key={token.id}
                className="border rounded-lg p-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">{token.farm_name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{token.token_id}</p>
                  </div>
                  {getStatusBadge(token.status)}
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Quantidade</p>
                    <p className="font-semibold">{token.amount_kwh} kWh</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Preço/kWh</p>
                    <p className="font-semibold">R$ {parseFloat(token.price_per_kwh.toString()).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valor Total</p>
                    <p className="font-semibold text-purple-600">
                      R$ {parseFloat(token.total_value.toString()).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                  Criado em {new Date(token.created_at).toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
