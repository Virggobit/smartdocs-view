import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Building2, CheckCircle2, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import logoSol from "@/assets/logo-sol.png";

const ConnectEnergy = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploadingBill, setUploadingBill] = useState(false);
  const [connectingBank, setConnectingBank] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 10MB",
          variant: "destructive",
        });
        return;
      }
      if (!file.type.includes("pdf") && !file.type.includes("image")) {
        toast({
          title: "Formato inválido",
          description: "Envie apenas PDF ou imagens (JPG, PNG)",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadBill = async () => {
    if (!selectedFile || !user) return;

    setUploadingBill(true);
    try {
      // Criar registro inicial
      const { data: billData, error: billError } = await supabase
        .from("energy_bills")
        .insert({
          user_id: user.id,
          status: "processing",
        })
        .select()
        .single();

      if (billError) throw billError;

      // Chamar edge function para processar OCR
      const { data, error } = await supabase.functions.invoke("analyze-energy-bill", {
        body: { 
          billId: billData.id,
          fileName: selectedFile.name,
          fileType: selectedFile.type,
        },
      });

      if (error) throw error;

      toast({
        title: "Conta de luz enviada!",
        description: "Analisando seu histórico de consumo...",
      });

      // Aguardar processamento e redirecionar
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Error uploading bill:", error);
      toast({
        title: "Erro ao enviar conta",
        description: error.message || "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setUploadingBill(false);
    }
  };

  const handleConnectBank = async () => {
    if (!user) return;

    setConnectingBank(true);
    try {
      // Criar registro de conexão
      const { data: connectionData, error: connectionError } = await supabase
        .from("open_finance_connections")
        .insert({
          user_id: user.id,
          bank_code: "001", // Banco do Brasil
          connection_status: "pending",
        })
        .select()
        .single();

      if (connectionError) throw connectionError;

      // Chamar edge function para iniciar Open Finance
      const { data, error } = await supabase.functions.invoke("connect-open-finance", {
        body: { 
          connectionId: connectionData.id,
        },
      });

      if (error) throw error;

      // Simular redirecionamento para Banco do Brasil
      toast({
        title: "Redirecionando para o Banco do Brasil",
        description: "Você será levado para autorizar o acesso...",
      });

      // Em produção, aqui seria o redirect para OAuth do BB
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      console.error("Error connecting bank:", error);
      toast({
        title: "Erro ao conectar",
        description: error.message || "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setConnectingBank(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <img 
            src={logoSol} 
            alt="Sol F" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Conecte sua Energia
          </h1>
          <p className="text-muted-foreground text-lg">
            Precisamos validar seu histórico para aprovar seu crédito
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Opção 1: Upload de Conta */}
          <Card className="border-2 hover:border-primary transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Envie sua Conta de Luz</CardTitle>
              <CardDescription className="text-base">
                Analisamos seu histórico de consumo e pagamento para criar seu Score Sol F
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                  <span>Últimos 6 meses de histórico</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                  <span>Seus dados ficam 100% seguros</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                  <span>Análise em menos de 1 minuto</span>
                </div>
              </div>

              <div className="pt-4">
                <input
                  type="file"
                  id="bill-upload"
                  className="hidden"
                  accept=".pdf,image/*"
                  onChange={handleFileSelect}
                />
                <label htmlFor="bill-upload">
                  <Button
                    type="button"
                    variant={selectedFile ? "default" : "outline"}
                    className="w-full"
                    onClick={() => selectedFile && handleUploadBill()}
                    disabled={uploadingBill}
                  >
                    {uploadingBill ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analisando...
                      </>
                    ) : selectedFile ? (
                      "Confirmar Envio"
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Escolher Arquivo
                      </>
                    )}
                  </Button>
                </label>
                {selectedFile && (
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    {selectedFile.name}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Opção 2: Open Finance */}
          <Card className="border-2 hover:border-accent transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                <Building2 className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Conecte com o Banco do Brasil</CardTitle>
              <CardDescription className="text-base">
                Use o Open Finance para acessar seu histórico financeiro e aprovar seu crédito
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                  <span>Conexão segura e oficial do BB</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                  <span>Aprovação instantânea</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                  <span>Limite de crédito maior</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="w-full"
                  onClick={handleConnectBank}
                  disabled={connectingBank}
                >
                  {connectingBank ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Conectando...
                    </>
                  ) : (
                    <>
                      <Building2 className="w-4 h-4 mr-2" />
                      Conectar com BB
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Por que fazemos isso?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Na <strong>Sol F</strong>, acreditamos que quem paga sua conta de luz em dia merece crédito, 
                  mesmo com score baixo no Serasa. Analisamos seu histórico real de consumo e pagamento 
                  para aprovar financiamentos que cabem no seu bolso.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
          >
            Pular por enquanto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectEnergy;