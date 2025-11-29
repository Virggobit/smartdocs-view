import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export type AppRole = 
  | 'cliente_gero' 
  | 'cliente_assino' 
  | 'instalador' 
  | 'admin_banco' 
  | 'gestor_cooperativa';

export const useUserRole = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!user) {
        setRoles([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (error) throw error;
        
        setRoles(data?.map(r => r.role as AppRole) || []);
      } catch (error) {
        console.error('Error fetching roles:', error);
        setRoles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [user]);

  const hasRole = (role: AppRole) => roles.includes(role);
  
  const isCliente = hasRole('cliente_gero') || hasRole('cliente_assino');
  const isInstalador = hasRole('instalador');
  const isAdmin = hasRole('admin_banco');
  const isGestor = hasRole('gestor_cooperativa');

  return {
    roles,
    loading,
    hasRole,
    isCliente,
    isInstalador,
    isAdmin,
    isGestor,
    primaryRole: roles[0] || null
  };
};
