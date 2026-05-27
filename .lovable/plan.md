## Objetivo

Preencher o template "Canvas da Solução" (PDF anexado, 1 página, 960×540pt) com o conteúdo da plataforma **Sol — Energia Solar Tokenizada** e entregar como PDF para download em `/mnt/documents/canvas-solucao-SoL-preenchido.pdf`.

## Abordagem técnica

1. Usar o PDF original como fundo (mantém layout, cores e títulos das 7 caixas do canvas).
2. Sobrepor o texto de cada campo via `pypdf` + `reportlab` (gerar overlay e fazer `merge_page`).
3. Coordenadas calculadas a partir do layout 960×540pt do template (cabeçalho + 7 blocos numerados).
4. QA visual obrigatório: converter para JPG com `pdftoppm -r 200` e revisar texto não cortado, contraste, alinhamento. Iterar até limpo.

## Conteúdo proposto para cada bloco

**Cabeçalho**
- Time: *Sol Team*
- Solução: *Sol — Plataforma de Energia Solar Tokenizada*
- Integrantes: *(deixar linha para preenchimento manual)*

**1. Problema** — Famílias de baixa renda e inquilinos ficam fora do crédito tradicional e não conseguem investir em energia solar. Instaladores enfrentam ciclo longo de venda e recebimento. Bancos não têm canal escalável para financiar microgeração.

**2. A Solução** — Plataforma que conecta gerador, consumidor, instalador e financiador via tokens de energia (kWh tokenizados). Usa histórico da conta de luz + Open Finance para aprovar crédito no modelo PAYS (parcela embutida na fatura, menor que a economia) e Cashback para quem aluga.

**3. Usuário** — 5 trilhas: *Eu Gero* (proprietário), *Eu Assino* (inquilino/cooperado), *Eu Instalo* (integrador), *Eu Financio* (BB), *Eu Distribuo* (cooperativa). Marcar: **residencial**, **rural**, **público**.

**4. Como Funciona** — (1) Usuário simula economia → (2) conecta conta de luz + Open Finance → (3) IA analisa crédito → (4) escolhe trilha (gerar ou assinar) → (5) BB libera financiamento e paga instalador → (6) energia gerada vira token no marketplace → (7) parcela debitada na conta de luz (PAYS) ou cashback (assinante).

**5. Diferenciais** — Crédito por histórico de pagamento (não score bancário); PAYS garante parcela < economia; tokenização permite excedente virar liquidez; SolBot com IA orienta jornada; integração nativa BB + cooperativas; inclui quem aluga.

**6. Hipóteses a Testar** — Adesão de inquilinos ao modelo cashback; disposição das distribuidoras em embutir parcela na fatura (PAYS); taxa de inadimplência vs. score tradicional; volume de tokens negociados no marketplace; CAC via instaladores parceiros.

**7. Impacto Estimado** — Ambiental **5**, Social **5**, Econômico **4**, Viabilidade **4**.

## Entrega

Arquivo final em `/mnt/documents/canvas-solucao-SoL-preenchido.pdf` exibido via `<presentation-artifact>` para download.
