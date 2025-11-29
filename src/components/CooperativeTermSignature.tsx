import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { FileText, CheckCircle2, Loader2 } from 'lucide-react';

const ANEEL_TERM_CONTENT = `
TERMO DE ADESÃO À COOPERATIVA DE ENERGIA SOLAR
(Conforme Resolução Normativa ANEEL nº 482/2012 e alterações)

Pelo presente instrumento, EU, abaixo identificado e qualificado, DECLARO minha adesão voluntária à COOPERATIVA SOL DE ENERGIA RENOVÁVEL, doravante denominada simplesmente COOPERATIVA, nos termos da Lei nº 5.764/71 e da Resolução Normativa ANEEL nº 482/2012.

1. OBJETO DA ADESÃO
1.1. O presente termo tem por objeto formalizar minha participação no sistema de compensação de energia elétrica por meio de geração distribuída compartilhada, conforme previsto na regulamentação da Agência Nacional de Energia Elétrica (ANEEL).

1.2. A COOPERATIVA opera uma usina de geração solar fotovoltaica que distribui os créditos de energia entre seus cooperados, reduzindo o valor da conta de energia elétrica de cada participante.

2. DIREITOS DO COOPERADO
2.1. Receber mensalmente créditos de energia elétrica proporcionais à sua cota de participação na usina solar da COOPERATIVA.

2.2. Acompanhar em tempo real, por meio da plataforma digital, a geração de energia e o saldo de créditos disponível.

2.3. Visualizar a economia gerada na conta de energia elétrica mensal.

2.4. Ter acesso transparente aos dados de geração e distribuição de energia.

3. DEVERES DO COOPERADO
3.1. Manter em dia o pagamento da mensalidade correspondente à sua cota de participação.

3.2. Fornecer informações verídicas e atualizadas sobre sua unidade consumidora cadastrada junto à distribuidora de energia.

3.3. Comunicar à COOPERATIVA qualquer alteração cadastral ou mudança de endereço da unidade consumidora.

3.4. Respeitar o estatuto social da COOPERATIVA e as decisões tomadas em assembleia.

4. FORMA DE PAGAMENTO
4.1. O valor devido pela participação será cobrado mensalmente através de sistema de débito automático na conta de energia elétrica (ON-BILL), conforme autorização específica.

4.2. Alternativamente, o cooperado poderá optar pelo pagamento via boleto bancário ou PIX.

5. VIGÊNCIA E RESCISÃO
5.1. O presente termo tem vigência por prazo indeterminado, podendo ser rescindido por qualquer das partes mediante aviso prévio de 30 (trinta) dias.

5.2. Em caso de rescisão pelo cooperado, os créditos de energia serão mantidos até o seu consumo integral ou compensação proporcional.

6. PROTEÇÃO DE DADOS (LGPD)
6.1. A COOPERATIVA se compromete a tratar os dados pessoais do cooperado em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).

6.2. Os dados coletados serão utilizados exclusivamente para fins de gestão da participação na cooperativa e relacionamento com a distribuidora de energia.

7. CONFORMIDADE REGULATÓRIA
7.1. Este termo está em conformidade com a Resolução Normativa ANEEL nº 482/2012 e suas atualizações, que estabelecem as condições gerais para o acesso de microgeração e minigeração distribuída aos sistemas de distribuição de energia elétrica.

7.2. A COOPERATIVA possui registro ativo junto à ANEEL e opera de acordo com todas as normas técnicas e regulatórias aplicáveis.

8. FORO
8.1. Fica eleito o foro da comarca de Belém/PA para dirimir quaisquer questões oriundas do presente termo.

Ao assinar digitalmente este termo, DECLARO estar ciente e de acordo com todas as cláusulas acima descritas.
`;

interface CooperativeTerm {
  id: string;
  status: string;
  signed_at: string | null;
  created_at: string;
  term_version: string;
}

export const CooperativeTermSignature = () => {
  const { user } = useAuth();
  const [term, setTerm] = useState<CooperativeTerm | null>(null);
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (user) {
      loadTerm();
    }
  }, [user]);

  const loadTerm = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cooperative_terms')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setTerm(data);
    } catch (error: any) {
      console.error('Erro ao carregar termo:', error);
      toast.error('Erro ao carregar termo de adesão');
    } finally {
      setLoading(false);
    }
  };

  const handleSign = async () => {
    if (!agreed) {
      toast.error('Você precisa concordar com os termos para continuar');
      return;
    }

    try {
      setSigning(true);

      // Criar hash simples da assinatura (em produção, usar biblioteca de criptografia apropriada)
      const signatureData = {
        timestamp: new Date().toISOString(),
        userId: user?.id,
        email: user?.email,
        userAgent: navigator.userAgent,
      };

      const signatureHash = btoa(JSON.stringify(signatureData));

      if (term) {
        // Atualizar termo existente
        const { error } = await supabase
          .from('cooperative_terms')
          .update({
            status: 'signed',
            signed_at: new Date().toISOString(),
            signature_hash: signatureHash,
            signature_metadata: signatureData,
          })
          .eq('id', term.id);

        if (error) throw error;
      } else {
        // Criar novo termo
        const { error } = await supabase
          .from('cooperative_terms')
          .insert({
            user_id: user?.id,
            term_version: 'v1.0',
            term_content: ANEEL_TERM_CONTENT,
            status: 'signed',
            signed_at: new Date().toISOString(),
            signature_hash: signatureHash,
            signature_metadata: signatureData,
          });

        if (error) throw error;
      }

      toast.success('Termo assinado com sucesso!');
      await loadTerm();
    } catch (error: any) {
      console.error('Erro ao assinar termo:', error);
      toast.error('Erro ao assinar termo. Tente novamente.');
    } finally {
      setSigning(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (term?.status === 'signed') {
    return (
      <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-accent/20 p-2">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <CardTitle className="text-foreground">Termo Assinado</CardTitle>
                <CardDescription>
                  Você já assinou o termo de adesão à cooperativa
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
              Assinado
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Data da assinatura:</strong>{' '}
              {new Date(term.signed_at || '').toLocaleString('pt-BR')}
            </p>
            <p>
              <strong>Versão do termo:</strong> {term.term_version}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="rounded-full bg-primary/10 p-2">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-foreground">
              Termo de Adesão à Cooperativa
            </CardTitle>
            <CardDescription>
              Conforme Resolução Normativa ANEEL nº 482/2012
            </CardDescription>
          </div>
        </div>
        <Badge variant="outline" className="w-fit">
          Pendente de Assinatura
        </Badge>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border border-border bg-muted/30 p-4">
          <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
            {ANEEL_TERM_CONTENT}
          </div>
        </ScrollArea>

        <div className="mt-6 flex items-start space-x-3 rounded-lg border border-border bg-card p-4">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="mt-1"
          />
          <label
            htmlFor="agree"
            className="text-sm font-medium leading-relaxed cursor-pointer text-foreground"
          >
            Li e concordo com todos os termos e condições descritos acima. Declaro estar
            ciente dos meus direitos e deveres como cooperado, bem como das condições de
            participação no sistema de compensação de energia elétrica.
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-3">
        <Button
          onClick={handleSign}
          disabled={!agreed || signing}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {signing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Assinando...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Assinar Digitalmente
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
