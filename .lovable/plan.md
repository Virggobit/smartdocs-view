## Objetivo
Gerar `/mnt/documents/canvas-modelo-negocio-SoL-preenchido.pdf` usando o template anexado como fundo e sobrepondo o conteúdo dos 9 blocos do Business Model Canvas com base na plataforma **Sol — Energia Solar Tokenizada**.

## Abordagem técnica
- Reaproveitar a mesma técnica do canvas anterior: `pypdf` + `reportlab` para gerar overlay e `merge_page` no PDF original (preserva layout, cores e títulos).
- Calcular coordenadas a partir do layout do template (cabeçalho + 9 blocos em grid 3 colunas no topo / faixa inferior com Custos e Receitas).
- QA visual obrigatório via `pdftoppm -r 200` para validar quebras de linha, contraste e contenção dentro das caixas.

## Conteúdo proposto

**Cabeçalho** — Time: *Sol Team* · Solução: *Sol — Plataforma de Energia Solar Tokenizada* · Integrantes: *(linha para preenchimento manual)*

**1. Parcerias-Chave**
Banco do Brasil (funding e Open Finance); cooperativas de energia (geração distribuída); instaladores/integradores credenciados; distribuidoras de energia (PAYS na fatura); ANEEL (compliance); provedores de IA/OCR para análise de conta.

**2. Atividades-Chave**
Análise de crédito alternativa via histórico de conta de luz + Open Finance; tokenização de kWh; operação do marketplace de tokens; orquestração de financiamento (BB ↔ instalador); curadoria de cooperativas; suporte via SolBot (IA).

**3. Proposta de Valor**
Acesso à energia solar para quem está fora do crédito tradicional (baixa renda, inquilinos). Modelo PAYS: parcela embutida na fatura **sempre menor que a economia**. Cashback para assinantes de cooperativas. Para instaladores: recebimento imediato e pipeline qualificado. Para o BB: nova classe de ativo com baixa inadimplência.

**4. Relacionamento**
Autoatendimento digital com SolBot (IA conversacional); jornada guiada por trilha (Gero, Assino, Instalo, Financio, Distribuo); dashboards personalizados por perfil; assinatura digital do Termo de Adesão ANEEL; suporte humano em casos de exceção.

**5. Segmento de Clientes**
- *Eu Gero*: proprietários residenciais/rurais que querem instalar geração própria.
- *Eu Assino*: inquilinos e famílias de baixa renda sem telhado, via cooperativa.
- *Eu Instalo*: integradores solares de pequeno e médio porte.
- *Eu Financio*: Banco do Brasil (parceiro financiador).
- *Eu Distribuo*: cooperativas de geração compartilhada.

**6. Recursos-Chave**
Plataforma web + Lovable Cloud (Supabase); motor de Score Sol F (IA); integração Open Finance BB; OCR de conta de luz; smart contracts para tokens de kWh; base de instaladores e cooperativas homologadas; marca co-branded com BB.

**7. Canais**
App/web Sol; agências e app do BB (co-branded); rede de instaladores parceiros; cooperativas afiliadas; marketing digital segmentado (baixa renda, rural); parcerias com programas sociais e distribuidoras.

**8. Estrutura de Custos**
*Fixos:* time de tech/produto, infra cloud, compliance ANEEL/BACEN, licenças de IA.
*Variáveis:* custo de aquisição (CAC via instaladores/cooperativas), tarifas Open Finance, gateway de pagamento, comissões a parceiros, suporte ao cliente, provisão para inadimplência.

**9. Fontes de Receita**
- Spread/originação sobre o financiamento (split com BB).
- Taxa de transação no marketplace de tokens de kWh.
- Mensalidade SaaS de instaladores e cooperativas (planos por volume).
- Fee de tokenização (mint) por kWh.
- Receita de dados/score (modelo B2B para parceiros financeiros).

## Entrega
Arquivo final em `/mnt/documents/canvas-modelo-negocio-SoL-preenchido.pdf`, apresentado via `<presentation-artifact>` para download. Sem alterações no código da aplicação React.
