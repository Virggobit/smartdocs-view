import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Token {
  id: string;
  token_id: string;
  farm_name: string;
  amount_kwh: number;
  price_per_kwh: number;
  status: string;
}

export const TokenTransfer = () => {
  const [selectedTokenId, setSelectedTokenId] = useState<string>("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [amountKwh, setAmountKwh] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar tokens do usuário
  const { data: myTokens, isLoading } = useQuery({
    queryKey: ["my-tokens"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      const { data, error } = await supabase
        .from("energy_tokens")
        .select("*")
        .eq("created_by", user.id)
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Token[];
    },
  });

  // Mutation para transferir token
  const transferMutation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Não autenticado");

      // Buscar usuário destinatário pelo email
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("full_name", recipientEmail)
        .single();

      if (profileError || !profiles) {
        throw new Error("Usuário destinatário não encontrado");
      }

      const recipientId = profiles.user_id;
      const amount = parseFloat(amountKwh);

      // Validar transferência usando a função do banco
      const { data: isValid, error: validationError } = await supabase
        .rpc("validate_token_transfer", {
          _token_id: selectedTokenId,
          _from_user_id: user.id,
          _amount_kwh: amount,
        });

      if (validationError) throw validationError;
      if (!isValid) throw new Error("Validação de transferência falhou");

      // Gerar hash de transação
      const { data: txHash } = await supabase.rpc("generate_transaction_hash");

      // Criar transação
      const { error: txError } = await supabase
        .from("token_transactions")
        .insert({
          token_id: selectedTokenId,
          from_user_id: user.id,
          to_user_id: recipientId,
          transaction_type: "transfer",
          amount_kwh: amount,
          transaction_hash: txHash,
          status: "confirmed",
          metadata: {
            recipient_email: recipientEmail,
            transfer_date: new Date().toISOString(),
          },
        });

      if (txError) throw txError;

      // Atualizar token para transferir a propriedade
      const selectedToken = myTokens?.find((t) => t.id === selectedTokenId);
      if (!selectedToken) throw new Error("Token não encontrado");

      const newAmount = selectedToken.amount_kwh - amount;

      if (newAmount === 0) {
        // Se transferiu tudo, muda o dono
        const { error: updateError } = await supabase
          .from("energy_tokens")
          .update({ created_by: recipientId })
          .eq("id", selectedTokenId);

        if (updateError) throw updateError;
      } else {
        // Se transferiu parte, cria novo token para o destinatário
        const { error: createError } = await supabase
          .from("energy_tokens")
          .insert({
            token_id: `${selectedToken.token_id}-split-${Date.now()}`,
            farm_id: crypto.randomUUID(),
            farm_name: selectedToken.farm_name,
            amount_kwh: amount,
            price_per_kwh: selectedToken.price_per_kwh,
            total_value: amount * selectedToken.price_per_kwh,
            created_by: recipientId,
            status: "available",
          });

        if (createError) throw createError;

        // Atualiza o token original
        const { error: updateError } = await supabase
          .from("energy_tokens")
          .update({
            amount_kwh: newAmount,
            total_value: newAmount * selectedToken.price_per_kwh,
          })
          .eq("id", selectedTokenId);

        if (updateError) throw updateError;
      }
    },
    onSuccess: () => {
      toast({
        title: "Transferência realizada com sucesso!",
        description: `${amountKwh} kWh transferidos para ${recipientEmail}`,
      });
      setSelectedTokenId("");
      setRecipientEmail("");
      setAmountKwh("");
      queryClient.invalidateQueries({ queryKey: ["my-tokens"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro na transferência",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleTransfer = () => {
    if (!selectedTokenId || !recipientEmail || !amountKwh) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para realizar a transferência",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(amountKwh);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Quantidade inválida",
        description: "Digite uma quantidade válida de kWh",
        variant: "destructive",
      });
      return;
    }

    transferMutation.mutate();
  };

  const selectedToken = myTokens?.find((t) => t.id === selectedTokenId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5" />
          Transferir Tokens
        </CardTitle>
        <CardDescription>
          Transfira créditos de energia para outros usuários de forma segura
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : !myTokens || myTokens.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Você não possui tokens disponíveis para transferência
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="token-select">Selecione o Token</Label>
              <Select value={selectedTokenId} onValueChange={setSelectedTokenId}>
                <SelectTrigger id="token-select">
                  <SelectValue placeholder="Escolha um token..." />
                </SelectTrigger>
                <SelectContent>
                  {myTokens.map((token) => (
                    <SelectItem key={token.id} value={token.id}>
                      {token.farm_name} - {token.amount_kwh} kWh disponíveis
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedToken && (
                <p className="text-sm text-muted-foreground">
                  Valor: R$ {selectedToken.price_per_kwh.toFixed(2)}/kWh •{" "}
                  Total: R$ {(selectedToken.amount_kwh * selectedToken.price_per_kwh).toFixed(2)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Quantidade (kWh)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                max={selectedToken?.amount_kwh}
                placeholder="Digite a quantidade em kWh"
                value={amountKwh}
                onChange={(e) => setAmountKwh(e.target.value)}
              />
              {selectedToken && amountKwh && (
                <p className="text-sm text-muted-foreground">
                  Valor da transferência: R${" "}
                  {(parseFloat(amountKwh) * selectedToken.price_per_kwh).toFixed(2)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Email do Destinatário</Label>
              <Input
                id="recipient"
                type="email"
                placeholder="destinatario@email.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>

            <Button
              onClick={handleTransfer}
              disabled={transferMutation.isPending || !selectedTokenId || !recipientEmail || !amountKwh}
              className="w-full"
            >
              {transferMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando transferência...
                </>
              ) : (
                <>
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Confirmar Transferência
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
