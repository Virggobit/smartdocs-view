import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Simulator from "./pages/Simulator";
import Trilhas from "./pages/Trilhas";
import Marketplace from "./pages/Marketplace";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import ConnectEnergy from "./pages/ConnectEnergy";
import AdminDashboard from "./pages/AdminDashboard";
import InstallerDashboard from "./pages/InstallerDashboard";
import CooperativaDashboard from "./pages/CooperativaDashboard";
import FinanciadorDashboard from "./pages/FinanciadorDashboard";
import DistribuidorDashboard from "./pages/DistribuidorDashboard";
import ProjectStructure from "./pages/ProjectStructure";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Landing Page sem sidebar */}
            <Route path="/" element={<Index />} />
            
            {/* Auth Page */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Conectar Energia - Protegida mas sem sidebar */}
            <Route 
              path="/conectar-energia" 
              element={
                <ProtectedRoute>
                  <ConnectEnergy />
                </ProtectedRoute>
              } 
            />
            
            {/* Rotas protegidas com sidebar (dashboard) */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/instalador" 
              element={
                <ProtectedRoute>
                  <InstallerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cooperativa" 
              element={
                <ProtectedRoute>
                  <CooperativaDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/financiador" 
              element={
                <ProtectedRoute>
                  <FinanciadorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/distribuidor" 
              element={
                <ProtectedRoute>
                  <DistribuidorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/simulador" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Simulator /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/trilhas" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Trilhas /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/marketplace" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Marketplace /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/configuracoes" 
              element={
                <ProtectedRoute>
                  <DashboardLayout><Settings /></DashboardLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/project-structure" 
              element={
                <ProtectedRoute>
                  <ProjectStructure />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
