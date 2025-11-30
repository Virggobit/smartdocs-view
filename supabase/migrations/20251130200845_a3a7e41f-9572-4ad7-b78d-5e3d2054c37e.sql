-- Adicionar novas trilhas ao enum trilha_type
ALTER TYPE trilha_type ADD VALUE IF NOT EXISTS 'eu_financio';
ALTER TYPE trilha_type ADD VALUE IF NOT EXISTS 'eu_distribuo';