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
    const { billId, fileName, fileType } = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Processing energy bill:", billId);

    // Simular análise OCR (em produção, usar serviço real de OCR)
    // Dados simulados baseados em análise de conta de luz
    const mockOCRData = {
      cpf: "***.***.***-**",
      customerName: "Cliente Exemplo",
      installationNumber: "123456789",
      monthlyConsumption: [
        { month: "Nov/2024", kwh: 250, value: 180.50 },
        { month: "Out/2024", kwh: 270, value: 195.30 },
        { month: "Set/2024", kwh: 240, value: 172.80 },
        { month: "Ago/2024", kwh: 260, value: 187.40 },
        { month: "Jul/2024", kwh: 255, value: 183.60 },
        { month: "Jun/2024", kwh: 245, value: 176.40 },
      ],
      paymentHistory: [
        { month: "Nov/2024", paid: true, daysLate: 0 },
        { month: "Out/2024", paid: true, daysLate: 0 },
        { month: "Set/2024", paid: true, daysLate: 2 },
        { month: "Ago/2024", paid: true, daysLate: 0 },
        { month: "Jul/2024", paid: true, daysLate: 0 },
        { month: "Jun/2024", paid: true, daysLate: 0 },
      ],
    };

    // Calcular métricas
    const totalConsumption = mockOCRData.monthlyConsumption.reduce((acc, m) => acc + m.kwh, 0);
    const averageConsumption = totalConsumption / mockOCRData.monthlyConsumption.length;
    
    const totalPayment = mockOCRData.monthlyConsumption.reduce((acc, m) => acc + m.value, 0);
    const averagePayment = totalPayment / mockOCRData.monthlyConsumption.length;
    
    const onTimePayments = mockOCRData.paymentHistory.filter(p => p.paid && p.daysLate === 0).length;
    const paymentHistoryMonths = mockOCRData.paymentHistory.length;

    // Atualizar registro da conta
    const { error: updateError } = await supabase
      .from("energy_bills")
      .update({
        status: "validated",
        extracted_data: mockOCRData,
        average_consumption: averageConsumption,
        average_payment: averagePayment,
        payment_history_months: paymentHistoryMonths,
        on_time_payments: onTimePayments,
      })
      .eq("id", billId);

    if (updateError) throw updateError;

    // Calcular Score Sol F
    const score = calculateSolFScore(
      onTimePayments,
      paymentHistoryMonths,
      averagePayment
    );

    // Calcular valor aprovado baseado no score e consumo médio
    const approvedAmount = calculateApprovedAmount(score, averagePayment);
    const interestRate = calculateInterestRate(score);

    // Buscar user_id da bill
    const { data: billData, error: billError } = await supabase
      .from("energy_bills")
      .select("user_id")
      .eq("id", billId)
      .single();

    if (billError) throw billError;

    // Criar ou atualizar análise de crédito
    const { error: creditError } = await supabase
      .from("credit_analysis")
      .upsert({
        user_id: billData.user_id,
        score: score,
        status: score >= 60 ? "approved" : "requires_more_info",
        approved_amount: approvedAmount,
        interest_rate: interestRate,
        analysis_data: {
          source: "energy_bill",
          bill_id: billId,
          metrics: {
            on_time_payment_rate: (onTimePayments / paymentHistoryMonths) * 100,
            average_monthly_payment: averagePayment,
            payment_capacity: averagePayment * 0.3, // 30% da conta pode virar parcela
          },
        },
      }, {
        onConflict: "user_id",
      });

    if (creditError) throw creditError;

    console.log("Credit analysis completed:", { score, approvedAmount });

    return new Response(
      JSON.stringify({
        success: true,
        score: score,
        status: score >= 60 ? "approved" : "requires_more_info",
        approved_amount: approvedAmount,
        interest_rate: interestRate,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error analyzing energy bill:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function calculateSolFScore(
  onTimePayments: number,
  totalMonths: number,
  averagePayment: number
): number {
  // Score base: pagamentos em dia (0-70 pontos)
  const paymentScore = (onTimePayments / totalMonths) * 70;
  
  // Score de capacidade: quanto maior a conta, mais crédito (0-30 pontos)
  const capacityScore = Math.min((averagePayment / 500) * 30, 30);
  
  return Math.round(paymentScore + capacityScore);
}

function calculateApprovedAmount(score: number, averagePayment: number): number {
  // Quanto maior o score, maior o multiplicador
  let multiplier = 30; // Base: 30x a conta mensal
  
  if (score >= 90) multiplier = 50;
  else if (score >= 80) multiplier = 45;
  else if (score >= 70) multiplier = 40;
  else if (score >= 60) multiplier = 35;
  
  return Math.round(averagePayment * multiplier);
}

function calculateInterestRate(score: number): number {
  // Quanto maior o score, menor a taxa
  if (score >= 90) return 1.5;
  if (score >= 80) return 1.8;
  if (score >= 70) return 2.1;
  if (score >= 60) return 2.5;
  return 3.0;
}