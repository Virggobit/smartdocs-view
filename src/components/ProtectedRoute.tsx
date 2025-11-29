import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const { primaryRole, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { replace: true });
      return;
    }

    // Redirect based on role after both auth and role data are loaded
    if (!authLoading && !roleLoading && user && primaryRole && location.pathname === '/dashboard') {
      switch (primaryRole) {
        case 'admin_banco':
          navigate('/admin', { replace: true });
          break;
        case 'instalador':
          navigate('/instalador', { replace: true });
          break;
        case 'gestor_cooperativa':
          navigate('/cooperativa', { replace: true });
          break;
        // cliente_gero and cliente_assino stay on /dashboard
      }
    }
  }, [user, authLoading, roleLoading, primaryRole, navigate, location]);

  if (authLoading || roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};