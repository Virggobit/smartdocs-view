import { DashboardSection } from "@/components/DashboardSection";
import { CooperativeTermSignature } from "@/components/CooperativeTermSignature";
import { useUserRole } from "@/hooks/useUserRole";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { roles } = useUserRole();
  const isClienteAssino = roles.includes('cliente_assino');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {isClienteAssino ? 'Minha Cooperativa' : 'Dashboard Analytics'}
          </h1>
          <p className="text-muted-foreground">
            {isClienteAssino 
              ? 'Assine o termo de adesão e comece a economizar com energia solar'
              : 'Acompanhe o desempenho da plataforma Sol'
            }
          </p>
        </div>

        {isClienteAssino ? (
          <Tabs defaultValue="termo" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="termo">Termo de Adesão</TabsTrigger>
              <TabsTrigger value="dashboard">Meus Dados</TabsTrigger>
            </TabsList>
            <TabsContent value="termo" className="mt-6">
              <CooperativeTermSignature />
            </TabsContent>
            <TabsContent value="dashboard" className="mt-6">
              <DashboardSection />
            </TabsContent>
          </Tabs>
        ) : (
          <DashboardSection />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
