-- Add new roles to app_role enum (must be done separately)
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'parceiro_financeiro';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'gestor_distribuicao';