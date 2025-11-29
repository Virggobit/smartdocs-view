-- Create table for cooperative membership terms
CREATE TABLE IF NOT EXISTS public.cooperative_terms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  term_version TEXT NOT NULL DEFAULT 'v1.0',
  term_content TEXT NOT NULL,
  signed_at TIMESTAMP WITH TIME ZONE,
  signature_hash TEXT,
  signature_metadata JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'pending',
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cooperative_terms ENABLE ROW LEVEL SECURITY;

-- Users can view their own terms
CREATE POLICY "Users can view their own cooperative terms"
ON public.cooperative_terms
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own terms
CREATE POLICY "Users can insert their own cooperative terms"
ON public.cooperative_terms
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own terms (for signing)
CREATE POLICY "Users can update their own cooperative terms"
ON public.cooperative_terms
FOR UPDATE
USING (auth.uid() = user_id);

-- Cooperative managers can view all terms
CREATE POLICY "Cooperative managers can view all terms"
ON public.cooperative_terms
FOR SELECT
USING (has_role(auth.uid(), 'gestor_cooperativa'));

-- Admin can view all terms
CREATE POLICY "Admin can view all cooperative terms"
ON public.cooperative_terms
FOR SELECT
USING (has_role(auth.uid(), 'admin_banco'));

-- Add trigger for updated_at
CREATE TRIGGER update_cooperative_terms_updated_at
BEFORE UPDATE ON public.cooperative_terms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();