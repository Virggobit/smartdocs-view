import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRightLeft, ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface Transaction {
  id: string;
  transaction_hash: string;
  transaction_type: string;
  amount_kwh: number;
  status: string;
  block_timestamp: string;
  metadata: any;
}

export const TransactionHistory = ({ refresh }: { refresh: number }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('token_transactions')
        .select('*')
        .order('block_timestamp', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mint':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'transfer':
        return <ArrowRightLeft className="w-4 h-4 text-blue-600" />;
      case 'burn':
        return <ArrowDownLeft className="w-4 h-4 text-red-600" />;
      default:
        return <ArrowRightLeft className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      mint: 'Criação',
      transfer: 'Transferência',
      burn: 'Queima',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', variant: 'secondary' as const },
      confirmed: { label: 'Confirmado', variant: 'default' as const },
      failed: { label: 'Falhou', variant: 'destructive' as const },
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Transações</CardTitle>
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
          <ArrowRightLeft className="w-5 h-5 text-purple-600" />
          <CardTitle>Histórico de Transações</CardTitle>
        </div>
        <CardDescription>
          Registro imutável de todas as operações na blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <ArrowRightLeft className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma transação registrada</p>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="border rounded-lg p-3 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(tx.transaction_type)}
                    <div>
                      <p className="font-semibold text-sm">{getTypeLabel(tx.transaction_type)}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {tx.transaction_hash}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(tx.status)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Quantidade</p>
                    <p className="font-semibold">{tx.amount_kwh} kWh</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Timestamp</p>
                    <p className="font-semibold">
                      {new Date(tx.block_timestamp).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                {tx.metadata?.farm_name && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Fazenda: <span className="font-medium">{tx.metadata.farm_name}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
