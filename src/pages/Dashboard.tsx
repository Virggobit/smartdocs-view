import { DashboardSection } from "@/components/DashboardSection";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard Analytics</h1>
          <p className="text-muted-foreground">Acompanhe o desempenho da plataforma Sol</p>
        </div>
        
        <DashboardSection />
      </div>
    </div>
  );
};

export default Dashboard;
