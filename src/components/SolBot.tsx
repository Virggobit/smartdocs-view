import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const SolBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Olá! Sou o SolBot, seu consultor de energia solar. Me conte: qual sua cidade e quanto você gasta de energia por mês (em kWh)? Vou encontrar geradores solares perfeitos para você!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    const chatUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/solbot`;
    
    const updatedMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(updatedMessages);
    
    let assistantMessage = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch(chatUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao conectar com o SolBot");
      }

      if (!response.body) throw new Error("Sem resposta do servidor");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = assistantMessage;
                return newMessages;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao processar mensagem",
        variant: "destructive",
      });
      setMessages((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    await streamChat(userMessage);
    setIsLoading(false);
  };

  const handleSignup = () => {
    navigate("/auth");
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-solar-yellow hover:bg-solar-orange text-foreground z-50"
        size="icon"
      >
        <Bot className="h-8 w-8" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[90vw] max-w-md h-[600px] flex flex-col shadow-2xl z-50 border-2 border-solar-yellow/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-solar-blue to-primary">
        <div className="flex items-center gap-2">
          <div className="bg-solar-yellow rounded-full p-2">
            <Bot className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-primary-foreground">SolBot</h3>
            <p className="text-xs text-primary-foreground/80">Consultor de Energia Solar</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.role === "user"
                  ? "bg-solar-blue text-primary-foreground ml-4"
                  : "bg-muted mr-4"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-2 mr-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-solar-yellow rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-solar-yellow rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-solar-yellow rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* CTA Banner */}
      <div className="px-4 py-2 bg-solar-yellow/10 border-t border-solar-yellow/20">
        <Button
          onClick={handleSignup}
          className="w-full bg-solar-yellow hover:bg-solar-orange text-foreground font-semibold"
        >
          Cadastrar para Ver Análise Completa
        </Button>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="bg-solar-yellow hover:bg-solar-orange text-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
};