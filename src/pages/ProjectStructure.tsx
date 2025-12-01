import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import { jsPDF } from "jspdf";
import projectData from "../../project-structure.json";

const ProjectStructure = () => {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = 20;

    // Função para adicionar texto com quebra de linha automática
    const addText = (text: string, size: number = 10, isBold: boolean = false) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      
      const lines = doc.splitTextToSize(text, maxWidth);
      
      lines.forEach((line: string) => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += size * 0.5;
      });
      
      yPosition += 5;
    };

    // Título
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Estrutura do Projeto - Solar Energy Platform", margin, yPosition);
    yPosition += 15;

    // Metadata
    addText("METADADOS DO PROJETO", 14, true);
    addText(`Nome: ${projectData.metadata.projectName}`);
    addText(`Tipo: ${projectData.metadata.type}`);
    addText(`Framework: ${projectData.metadata.framework}`);
    addText(`UI Library: ${projectData.metadata.uiLibrary}`);
    addText(`Backend: ${projectData.metadata.backend}`);
    addText(`Descrição: ${projectData.metadata.description}`);

    // Technology Stack
    yPosition += 10;
    addText("STACK DE TECNOLOGIAS", 14, true);
    addText(`Runtime: ${projectData.technology.runtime}`);
    addText(`Framework: ${projectData.technology.framework}`);
    addText(`Linguagem: ${projectData.technology.language}`);
    addText(`Estilização: ${projectData.technology.styling}`);
    addText(`State Management: ${projectData.technology.stateManagement}`);
    addText(`Roteamento: ${projectData.technology.routing}`);
    addText(`Backend: ${projectData.technology.backend}`);
    addText(`Formulários: ${projectData.technology.forms}`);
    addText(`Gráficos: ${projectData.technology.charts}`);

    // Rotas Públicas
    yPosition += 10;
    addText("ROTAS PÚBLICAS", 14, true);
    projectData.routes.public.forEach(route => {
      addText(`${route.path} - ${route.component}`);
      addText(`  ${route.description}`, 9);
    });

    // Rotas Protegidas
    yPosition += 10;
    addText("ROTAS PROTEGIDAS", 14, true);
    projectData.routes.protected.forEach(route => {
      addText(`${route.path} - ${route.component}`);
      addText(`  ${route.description}`, 9);
      if (route.requiredRole) {
        addText(`  Papel requerido: ${route.requiredRole}`, 9);
      }
    });

    // Database
    yPosition += 10;
    addText("BANCO DE DADOS", 14, true);
    addText(`Provider: ${projectData.database.provider}`);
    addText("Tabelas:");
    projectData.database.tables.forEach(table => {
      addText(`  • ${table.name}: ${table.description}`, 9);
      addText(`    RLS habilitado: ${table.hasRLS ? "Sim" : "Não"}`, 8);
    });

    // Edge Functions
    yPosition += 10;
    addText("EDGE FUNCTIONS", 14, true);
    projectData.edgeFunctions.forEach(func => {
      addText(`${func.name}`);
      addText(`  ${func.description}`, 9);
      addText(`  Requer autenticação: ${func.requiresAuth ? "Sim" : "Não"}`, 9);
    });

    // Features
    yPosition += 10;
    addText("FUNCIONALIDADES", 14, true);
    projectData.features.forEach(feature => {
      addText(`${feature.name} (${feature.status})`);
      addText(`  ${feature.description}`, 9);
    });

    // Componentes
    yPosition += 10;
    addText("COMPONENTES", 14, true);
    addText("Layout:");
    projectData.components.layout.forEach(comp => {
      addText(`  • ${comp.name}: ${comp.description}`, 9);
    });
    
    addText("Features:");
    projectData.components.features.forEach(comp => {
      addText(`  • ${comp.name}: ${comp.description}`, 9);
    });

    // Salvar o PDF
    doc.save("project-structure.pdf");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Estrutura do Projeto</h1>
            <p className="text-muted-foreground mt-2">
              Visualização completa da arquitetura e configuração do projeto
            </p>
          </div>
          <Button onClick={generatePDF} size="lg" className="gap-2">
            <FileDown className="h-5 w-5" />
            Exportar PDF
          </Button>
        </div>

        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle>Metadados do Projeto</CardTitle>
            <CardDescription>Informações básicas sobre o projeto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Nome</p>
                <p className="text-sm text-muted-foreground">{projectData.metadata.projectName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Tipo</p>
                <p className="text-sm text-muted-foreground">{projectData.metadata.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Framework</p>
                <p className="text-sm text-muted-foreground">{projectData.metadata.framework}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Backend</p>
                <p className="text-sm text-muted-foreground">{projectData.metadata.backend}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Descrição</p>
              <p className="text-sm text-muted-foreground">{projectData.metadata.description}</p>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Stack de Tecnologias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(projectData.technology).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className="text-sm text-muted-foreground">{value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Rotas */}
        <Card>
          <CardHeader>
            <CardTitle>Rotas da Aplicação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Rotas Públicas</h3>
              <div className="space-y-2">
                {projectData.routes.public.map((route, idx) => (
                  <div key={idx} className="border-l-2 border-primary pl-4">
                    <p className="font-mono text-sm">{route.path}</p>
                    <p className="text-sm text-muted-foreground">{route.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Rotas Protegidas</h3>
              <div className="space-y-2">
                {projectData.routes.protected.map((route, idx) => (
                  <div key={idx} className="border-l-2 border-accent pl-4">
                    <p className="font-mono text-sm">{route.path}</p>
                    <p className="text-sm text-muted-foreground">{route.description}</p>
                    {route.requiredRole && (
                      <p className="text-xs text-muted-foreground">Papel: {route.requiredRole}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database */}
        <Card>
          <CardHeader>
            <CardTitle>Banco de Dados</CardTitle>
            <CardDescription>{projectData.database.provider}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projectData.database.tables.map((table, idx) => (
                <div key={idx} className="border-l-2 border-secondary pl-4">
                  <p className="font-mono text-sm font-medium">{table.name}</p>
                  <p className="text-sm text-muted-foreground">{table.description}</p>
                  <p className="text-xs text-muted-foreground">RLS: {table.hasRLS ? "Habilitado" : "Desabilitado"}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Edge Functions */}
        <Card>
          <CardHeader>
            <CardTitle>Edge Functions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projectData.edgeFunctions.map((func, idx) => (
                <div key={idx} className="border-l-2 border-primary pl-4">
                  <p className="font-mono text-sm font-medium">{func.name}</p>
                  <p className="text-sm text-muted-foreground">{func.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Auth: {func.requiresAuth ? "Requerida" : "Não requerida"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Funcionalidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projectData.features.map((feature, idx) => (
                <div key={idx} className="border-l-2 border-accent pl-4">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{feature.name}</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {feature.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* JSON Raw */}
        <Card>
          <CardHeader>
            <CardTitle>JSON Completo</CardTitle>
            <CardDescription>Estrutura completa em formato JSON</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
              {JSON.stringify(projectData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectStructure;