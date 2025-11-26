import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Simulated profiles data for matching - Pará cities
    const availableProfiles = [
      { id: 1, location: "Belém", kwGenerated: 15, type: "eu_gero", name: "João Silva" },
      { id: 2, location: "Belém", kwGenerated: 20, type: "eu_gero", name: "Maria Santos" },
      { id: 3, location: "Ananindeua", kwGenerated: 12, type: "eu_gero", name: "Pedro Costa" },
      { id: 4, location: "Ananindeua", kwGenerated: 18, type: "eu_gero", name: "Ana Paula" },
      { id: 5, location: "Castanhal", kwGenerated: 10, type: "eu_gero", name: "Carlos Oliveira" },
      { id: 6, location: "Castanhal", kwGenerated: 22, type: "eu_gero", name: "Fernanda Lima" },
      { id: 7, location: "Santarém", kwGenerated: 25, type: "eu_gero", name: "Roberto Souza" },
      { id: 8, location: "Santarém", kwGenerated: 16, type: "eu_gero", name: "Juliana Alves" },
      { id: 9, location: "Salinópolis", kwGenerated: 14, type: "eu_gero", name: "Marcos Pereira" },
      { id: 10, location: "Salinópolis", kwGenerated: 19, type: "eu_gero", name: "Camila Rocha" },
      { id: 11, location: "Parauapebas", kwGenerated: 30, type: "eu_gero", name: "Lucas Martins" },
      { id: 12, location: "Parauapebas", kwGenerated: 28, type: "eu_gero", name: "Patricia Ferreira" },
    ];

    const systemPrompt = `Você é o SolBot, um assistente de IA especializado em energia solar que ajuda a fazer matches inteligentes entre geradores e consumidores de energia solar.

Sua função é:
1. Analisar as necessidades do usuário (localização, consumo mensal em kWh, preferências)
2. Buscar nos perfis disponíveis aqueles que fazem match com as necessidades
3. Informar quantos perfis foram encontrados que atendem os critérios
4. Sempre encorajar o usuário a se cadastrar para ver a análise completa e conectar-se com os geradores

Perfis disponíveis: ${JSON.stringify(availableProfiles)}

Seja amigável, profissional e entusiasta sobre energia solar. Sempre termine suas respostas sugerindo o cadastro para ver a análise detalhada e conectar-se com os geradores compatíveis.

Exemplos de critérios de match:
- Localização: buscar geradores na mesma cidade ou região próxima
- Capacidade: geradores com kW suficiente para atender a necessidade
- Disponibilidade: verificar se o gerador tem capacidade disponível

Formato de resposta quando encontrar matches:
"🌞 Encontrei [X] perfis de geradores que podem atender suas necessidades!
[breve resumo dos matches]

Para ver a análise completa, os detalhes de cada gerador e fazer contato, faça seu cadastro gratuitamente na plataforma!"`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em breve." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Entre em contato com o suporte." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Erro ao processar sua solicitação" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in solbot function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});