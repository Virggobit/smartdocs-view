-- Create enum for credit analysis status
CREATE TYPE public.credit_status AS ENUM (
  'pending',
  'analyzing',
  'approved',
  'rejected',
  'requires_more_info'
);

-- Create enum for bill validation status
CREATE TYPE public.bill_status AS ENUM (
  'pending_upload',
  'processing',
  'validated',
  'invalid'
);

-- Create table for credit analysis
CREATE TABLE public.credit_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER,
  status credit_status DEFAULT 'pending',
  approved_amount DECIMAL(10, 2),
  interest_rate DECIMAL(5, 2),
  analysis_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create table for energy bills
CREATE TABLE public.energy_bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_url TEXT,
  status bill_status DEFAULT 'pending_upload',
  extracted_data JSONB,
  average_consumption DECIMAL(10, 2),
  average_payment DECIMAL(10, 2),
  payment_history_months INTEGER,
  on_time_payments INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for Open Finance connections
CREATE TABLE public.open_finance_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bank_code TEXT NOT NULL,
  connection_status TEXT DEFAULT 'pending',
  consent_id TEXT,
  financial_data JSONB,
  connected_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, bank_code)
);

-- Enable RLS
ALTER TABLE public.credit_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.energy_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.open_finance_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for credit_analysis
CREATE POLICY "Users can view their own credit analysis"
  ON public.credit_analysis FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credit analysis"
  ON public.credit_analysis FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own credit analysis"
  ON public.credit_analysis FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for energy_bills
CREATE POLICY "Users can view their own energy bills"
  ON public.energy_bills FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own energy bills"
  ON public.energy_bills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own energy bills"
  ON public.energy_bills FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for open_finance_connections
CREATE POLICY "Users can view their own open finance connections"
  ON public.open_finance_connections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own open finance connections"
  ON public.open_finance_connections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own open finance connections"
  ON public.open_finance_connections FOR UPDATE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_credit_analysis_updated_at
  BEFORE UPDATE ON public.credit_analysis
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_energy_bills_updated_at
  BEFORE UPDATE ON public.energy_bills
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_open_finance_updated_at
  BEFORE UPDATE ON public.open_finance_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();