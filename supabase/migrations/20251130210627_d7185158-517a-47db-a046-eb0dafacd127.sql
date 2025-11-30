-- Permitir que usuários transfiram tokens entre si
CREATE POLICY "Usuários podem criar transferências de tokens"
ON public.token_transactions
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = from_user_id 
  AND transaction_type = 'transfer'
);

-- Criar função para validar transferência de tokens
CREATE OR REPLACE FUNCTION public.validate_token_transfer(
  _token_id uuid,
  _from_user_id uuid,
  _amount_kwh numeric
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  token_owner uuid;
  token_amount numeric;
  token_status text;
BEGIN
  -- Verificar se o token existe e obter informações
  SELECT created_by, amount_kwh, status
  INTO token_owner, token_amount, token_status
  FROM public.energy_tokens
  WHERE id = _token_id;
  
  -- Validações
  IF token_owner IS NULL THEN
    RAISE EXCEPTION 'Token não encontrado';
  END IF;
  
  IF token_owner != _from_user_id THEN
    RAISE EXCEPTION 'Você não é o proprietário deste token';
  END IF;
  
  IF token_status != 'available' THEN
    RAISE EXCEPTION 'Token não está disponível para transferência';
  END IF;
  
  IF token_amount < _amount_kwh THEN
    RAISE EXCEPTION 'Quantidade insuficiente no token';
  END IF;
  
  RETURN true;
END;
$$;

-- Permitir que usuários atualizem tokens que possuem
CREATE POLICY "Usuários podem atualizar seus próprios tokens"
ON public.energy_tokens
FOR UPDATE
TO authenticated
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);