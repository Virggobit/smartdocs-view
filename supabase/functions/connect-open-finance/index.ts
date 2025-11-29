import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { connectionId } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Initiating Open Finance connection:", connectionId);

    // Em produção, aqui seria a integração real com Open Finance do Banco do Brasil
    // Por enquanto, simulamos dados financeiros
    const mockFinancialData = {
      accountBalance: 2500.00,
      monthlyIncome: 3200.00,
      monthlyExpenses: 2100.00,
      creditScore: 680,
      activeLoans: 1,
      loanPaymentHistory: [
        { month: "Nov/2024", paid: true, daysLate: 0 },
        { month: "Out/2024", paid: true, daysLate: 0 },
        { month: "Set/2024", paid: true, daysLate: 0 },
        { month: "Ago/2024", paid: true, daysLate: 3 },
        { month: "Jul/2024", paid: true, daysLate: 0 },
        { month: "Jun/2024", paid: true, daysLate: 0 },
      ],
    };

    // Calcular score baseado em dados financeiros
    const financialScore = calculateFinancialScore(mockFinancialData);

    // Atualizar conexão Open Finance
    const { data: connectionData, error: updateError } = await supabase
      .from("open_finance_connections")
      .update({
        connection_status: "connected",
        financial_data: mockFinancialData,
        connected_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 dias
      })
      .eq("id", connectionId)
      .select("user_id")
      .single();

    if (updateError) throw updateError;

    // Calcular valor aprovado baseado em renda
    const approvedAmount = calculateApprovedAmountFromIncome(
      mockFinancialData.monthlyIncome,
      mockFinancialData.monthlyExpenses
    );

    const interestRate = calculateInterestRateFromScore(financialScore);

    // Criar ou atualizar análise de crédito
    const { error: creditError } = await supabase
      .from("credit_analysis")
      .upsert({
        user_id: connectionData.user_id,
        score: financialScore,
        status: financialScore >= 70 ? "approved" : "requires_more_info",
        approved_amount: approvedAmount,
        interest_rate: interestRate,
        analysis_data: {
          source: "open_finance",
          connection_id: connectionId,
          metrics: {
            monthly_income: mockFinancialData.monthlyIncome,
            monthly_expenses: mockFinancialData.monthlyExpenses,
            disposable_income: mockFinancialData.monthlyIncome - mockFinancialData.monthlyExpenses,
            credit_score: mockFinancialData.creditScore,
          },
        },
      }, {
        onConflict: "user_id",
      });

    if (creditError) throw creditError;

    console.log("Open Finance analysis completed:", { financialScore, approvedAmount });

    return new Response(
      JSON.stringify({
        success: true,
        score: financialScore,
        status: financialScore >= 70 ? "approved" : "requires_more_info",
        approved_amount: approvedAmount,
        interest_rate: interestRate,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error connecting Open Finance:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function calculateFinancialScore(data: any): number {
  // Score base: renda disponível (0-40 pontos)
  const disposableIncome = data.monthlyIncome - data.monthlyExpenses;
  const incomeScore = Math.min((disposableIncome / 2000) * 40, 40);
  
  // Score de histórico de pagamento (0-35 pontos)
  const onTimePayments = data.loanPaymentHistory.filter(
    (p: any) => p.paid && p.daysLate === 0
  ).length;
  const paymentScore = (onTimePayments / data.loanPaymentHistory.length) * 35;
  
  // Score de crédito tradicional (0-25 pontos)
  const creditScore = Math.min((data.creditScore / 850) * 25, 25);
  
  return Math.round(incomeScore + paymentScore + creditScore);
}

function calculateApprovedAmountFromIncome(
  monthlyIncome: number,
  monthlyExpenses: number
): number {
  const disposableIncome = monthlyIncome - monthlyExpenses;
  // Pode financiar até 40x a renda disponível (considerando 36 meses de pagamento)
  return Math.round(disposableIncome * 40);
}

function calculateInterestRateFromScore(score: number): number {
  if (score >= 90) return 1.2;
  if (score >= 80) return 1.5;
  if (score >= 70) return 1.8;
  if (score >= 60) return 2.2;
  return 2.8;
}