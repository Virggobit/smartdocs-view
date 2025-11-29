-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM (
  'cliente_gero',
  'cliente_assino', 
  'instalador',
  'admin_banco',
  'gestor_cooperativa'
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create helper function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(_user_id UUID)
RETURNS SETOF public.app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role
  FROM public.user_roles
  WHERE user_id = _user_id;
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin_banco'));

CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin_banco'));

CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin_banco'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin_banco'));

-- Update profiles table to remove trilha enum and add metadata
ALTER TABLE public.profiles DROP COLUMN trilha;
ALTER TABLE public.profiles ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;

-- Update trigger to handle role assignment during signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  user_role public.app_role;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name'
  );
  
  -- Extract role from metadata and insert into user_roles
  user_role := (new.raw_user_meta_data->>'role')::public.app_role;
  IF user_role IS NOT NULL THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, user_role);
  END IF;
  
  RETURN new;
END;
$$;

-- Add RLS policies for other tables based on roles
CREATE POLICY "Instaladores can view relevant energy bills"
ON public.energy_bills
FOR SELECT
USING (
  public.has_role(auth.uid(), 'instalador') OR
  public.has_role(auth.uid(), 'admin_banco') OR
  auth.uid() = user_id
);

CREATE POLICY "Admins can view all credit analyses"
ON public.credit_analysis
FOR SELECT
USING (
  public.has_role(auth.uid(), 'admin_banco') OR
  auth.uid() = user_id
);

CREATE POLICY "Admins can update credit analyses"
ON public.credit_analysis
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin_banco'));

CREATE POLICY "Gestor can view open finance connections"
ON public.open_finance_connections
FOR SELECT
USING (
  public.has_role(auth.uid(), 'gestor_cooperativa') OR
  public.has_role(auth.uid(), 'admin_banco') OR
  auth.uid() = user_id
);