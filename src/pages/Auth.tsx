import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { z } from 'zod';
import logo from '@/assets/logo-sol.png';
import { Sun } from 'lucide-react';

const signupSchema = z.object({
  fullName: z.string().trim().min(3, 'Nome deve ter no mínimo 3 caracteres').max(100, 'Nome muito longo'),
  email: z.string().trim().email('Email inválido').max(255, 'Email muito longo'),
  phone: z.string().trim().min(10, 'Telefone inválido').max(20, 'Telefone inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(100, 'Senha muito longa'),
  role: z.enum(['cliente_gero', 'cliente_assino', 'instalador', 'admin_banco', 'gestor_cooperativa'], { required_error: 'Escolha um perfil' }),
});

const loginSchema = z.object({
  email: z.string().trim().email('Email inválido').max(255, 'Email muito longo'),
  password: z.string().min(1, 'Senha é obrigatória').max(100, 'Senha muito longa'),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: '' as 'cliente_gero' | 'cliente_assino' | 'instalador' | 'admin_banco' | 'gestor_cooperativa' | '',
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = signupSchema.parse(formData);
      
      const redirectUrl = `${window.location.origin}/dashboard`;
      
      const { error } = await supabase.auth.signUp({
        email: validated.email,
        password: validated.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: validated.fullName,
            phone: validated.phone,
            role: validated.role,
          },
        },
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: 'Email já cadastrado',
            description: 'Este email já está em uso. Faça login.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Erro no cadastro',
            description: error.message,
            variant: 'destructive',
          });
        }
        return;
      }

      toast({
        title: 'Cadastro realizado!',
        description: 'Agora vamos validar seu crédito',
      });
      
      navigate('/conectar-energia');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Erro de validação',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = loginSchema.parse({
        email: formData.email,
        password: formData.password,
      });

      const { error } = await supabase.auth.signInWithPassword({
        email: validated.email,
        password: validated.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: 'Credenciais inválidas',
            description: 'Email ou senha incorretos.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Erro no login',
            description: error.message,
            variant: 'destructive',
          });
        }
        return;
      }

      toast({
        title: 'Login realizado!',
        description: 'Bem-vindo de volta.',
      });
      
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Erro de validação',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-solar-blue/20 via-background to-solar-orange/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Sol Logo" className="h-16 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Bem-vindo de volta' : 'Criar conta'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Entre com suas credenciais para acessar sua conta' 
              : 'Preencha os dados abaixo para começar'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isLogin ? handleLogin : handleSignUp} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="João Silva"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Escolha seu perfil</Label>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value as any })}
                    className="space-y-3"
                  >
                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value="cliente_gero" id="cliente_gero" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="cliente_gero" className="font-semibold cursor-pointer">
                          Cliente - Eu Gero
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Sou proprietário e quero instalar painéis solares
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value="cliente_assino" id="cliente_assino" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="cliente_assino" className="font-semibold cursor-pointer">
                          Cliente - Eu Assino
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Sou locatário e quero receber créditos de energia
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value="instalador" id="instalador" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="instalador" className="font-semibold cursor-pointer">
                          Instalador Parceiro
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Sou profissional instalador de sistemas solares
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value="gestor_cooperativa" id="gestor_cooperativa" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="gestor_cooperativa" className="font-semibold cursor-pointer">
                          Gestor de Cooperativa
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Administro fazendas solares e cooperativas
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                  Processando...
                </span>
              ) : (
                isLogin ? 'Entrar' : 'Criar conta'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </span>{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Link to="/" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Sun className="h-4 w-4" />
              Voltar para o início
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;