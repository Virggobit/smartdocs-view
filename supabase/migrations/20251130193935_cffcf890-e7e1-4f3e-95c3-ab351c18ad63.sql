-- Add RLS policies for new roles
CREATE POLICY "Parceiros financeiros podem ver análises de crédito"
ON public.credit_analysis
FOR SELECT
USING (has_role(auth.uid(), 'parceiro_financeiro'::app_role) OR has_role(auth.uid(), 'admin_banco'::app_role));

CREATE POLICY "Gestores de distribuição podem ver termos cooperativos"
ON public.cooperative_terms
FOR SELECT
USING (has_role(auth.uid(), 'gestor_distribuicao'::app_role) OR has_role(auth.uid(), 'admin_banco'::app_role));