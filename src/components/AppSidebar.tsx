import { Home, BarChart3, Calculator, BookOpen, Settings, Sun, Zap } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import logo from "@/assets/logo-sol.png";

export const AppSidebar = () => {
  const menuLinks = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { to: '/simulador', icon: Calculator, label: 'Simulador' },
    { to: '/trilhas', icon: BookOpen, label: 'Trilhas' },
    { to: '/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Sol Logo" className="h-10 w-auto" />
          <div>
            <h2 className="font-bold text-lg text-foreground">Sol</h2>
            <p className="text-xs text-muted-foreground">Energia Solar</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {menuLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <link.icon className="h-5 w-5" />
            <span className="font-medium">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-solar-yellow/10 to-solar-orange/10 rounded-lg">
          <Sun className="h-8 w-8 text-solar-yellow" />
          <div>
            <p className="text-sm font-semibold text-foreground">Economize até 70%</p>
            <p className="text-xs text-muted-foreground">na sua conta de luz</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
