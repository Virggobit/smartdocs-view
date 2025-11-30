-- Create table for energy tokens
CREATE TABLE public.energy_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token_id TEXT NOT NULL UNIQUE,
  farm_id UUID NOT NULL,
  farm_name TEXT NOT NULL,
  amount_kwh NUMERIC NOT NULL CHECK (amount_kwh > 0),
  price_per_kwh NUMERIC NOT NULL CHECK (price_per_kwh > 0),
  total_value NUMERIC GENERATED ALWAYS AS (amount_kwh * price_per_kwh) STORED,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create table for token transactions (blockchain-like immutable log)
CREATE TABLE public.token_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_hash TEXT NOT NULL UNIQUE,
  token_id UUID NOT NULL REFERENCES public.energy_tokens(id) ON DELETE RESTRICT,
  from_user_id UUID,
  to_user_id UUID NOT NULL,
  amount_kwh NUMERIC NOT NULL CHECK (amount_kwh > 0),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('mint', 'transfer', 'burn')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed')),
  block_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE public.energy_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.token_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for energy_tokens
CREATE POLICY "Gestores de distribuição podem criar tokens"
ON public.energy_tokens
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'gestor_distribuicao'::app_role));

CREATE POLICY "Gestores de distribuição podem visualizar todos tokens"
ON public.energy_tokens
FOR SELECT
USING (has_role(auth.uid(), 'gestor_distribuicao'::app_role) OR has_role(auth.uid(), 'admin_banco'::app_role));

CREATE POLICY "Gestores de distribuição podem atualizar tokens"
ON public.energy_tokens
FOR UPDATE
USING (has_role(auth.uid(), 'gestor_distribuicao'::app_role));

CREATE POLICY "Clientes podem visualizar tokens disponíveis"
ON public.energy_tokens
FOR SELECT
USING (status = 'available' AND (has_role(auth.uid(), 'cliente_assino'::app_role)));

-- RLS Policies for token_transactions
CREATE POLICY "Gestores de distribuição podem criar transações"
ON public.token_transactions
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'gestor_distribuicao'::app_role));

CREATE POLICY "Gestores de distribuição podem visualizar todas transações"
ON public.token_transactions
FOR SELECT
USING (has_role(auth.uid(), 'gestor_distribuicao'::app_role) OR has_role(auth.uid(), 'admin_banco'::app_role));

CREATE POLICY "Usuários podem ver suas próprias transações"
ON public.token_transactions
FOR SELECT
USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

-- Add indexes for performance
CREATE INDEX idx_energy_tokens_status ON public.energy_tokens(status);
CREATE INDEX idx_energy_tokens_created_by ON public.energy_tokens(created_by);
CREATE INDEX idx_token_transactions_token_id ON public.token_transactions(token_id);
CREATE INDEX idx_token_transactions_users ON public.token_transactions(from_user_id, to_user_id);
CREATE INDEX idx_token_transactions_timestamp ON public.token_transactions(block_timestamp DESC);

-- Function to generate transaction hash (simulate blockchain)
CREATE OR REPLACE FUNCTION public.generate_transaction_hash()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'TXN' || upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 32));
END;
$$;

-- Trigger to auto-generate transaction hash
CREATE OR REPLACE FUNCTION public.set_transaction_hash()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.transaction_hash IS NULL OR NEW.transaction_hash = '' THEN
    NEW.transaction_hash := public.generate_transaction_hash();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_transaction_hash_trigger
BEFORE INSERT ON public.token_transactions
FOR EACH ROW
EXECUTE FUNCTION public.set_transaction_hash();