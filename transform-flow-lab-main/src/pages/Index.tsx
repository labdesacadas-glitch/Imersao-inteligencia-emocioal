import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, Flame } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { initializeProtocol, FlowConfig } from "@/utils/storage";
import FlowConfigPanel from "@/components/flow/FlowConfigPanel";

const Index = () => {
  const navigate = useNavigate();
  const [selectedProtocol, setSelectedProtocol] = useState<"frustration" | "skills" | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  const handleSelectProtocol = (type: "frustration" | "skills") => {
    setSelectedProtocol(type);
    setShowConfig(true);
  };

  const handleConfigComplete = (config: FlowConfig) => {
    if (selectedProtocol) {
      initializeProtocol(selectedProtocol, config);
      navigate(`/preparacao/1`);
    }
  };

  if (showConfig && selectedProtocol) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-6xl w-full mx-auto space-y-8">
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => setShowConfig(false)}
              className="mb-4"
            >
              ← Voltar
            </Button>
          </div>
          <FlowConfigPanel onComplete={handleConfigComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full mx-auto space-y-12 animate-fade-in">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-display tracking-tight">
            VALOR CONTIDO
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light">
            Podcast de transformação real
          </p>
        </header>

        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display leading-tight">
            Pare de Girar na Roda da Frustração.
            <br />
            <span className="text-primary">Comece a Construir Resultados Reais.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            7 dias de imersão profunda para transformar padrões autodestrutivos em ação consistente.
            <br />
            Escolha sua jornada e liberte-se do ciclo vicioso que tem impedido seu sucesso.
          </p>
        </section>

        {/* Protocol Cards */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Frustration Protocol Card */}
          <Card className="glass-card p-8 space-y-6 hover-lift cursor-pointer group"
                onClick={() => handleSelectProtocol("frustration")}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <Flame className="w-12 h-12 text-primary" />
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Protocolo 7 dias
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-display">
                  Quebrando a Roda da Frustração
                </h3>
                <p className="text-sm text-primary font-semibold">
                  Estou Recomeçando
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Para quem já tentou, se frustrou e está preso no loop: 
                Empolgação → Frustração → Revolta → Sonho de Molho
              </p>
            </div>

            <Button 
              variant="default" 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 glow-accent group-hover:scale-105 transition-transform"
            >
              Libertar-me da Roda
            </Button>
          </Card>

          {/* Skills Protocol Card */}
          <Card className="glass-card p-8 space-y-6 hover-lift cursor-pointer group"
                onClick={() => handleSelectProtocol("skills")}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <Compass className="w-12 h-12 text-primary" />
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Protocolo 7 dias
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl md:text-3xl font-display">
                  Descobrindo e Monetizando Suas Habilidades
                </h3>
                <p className="text-sm text-primary font-semibold">
                  Estou Começando
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Para quem está no início da jornada e quer descobrir o que tem de valor para oferecer ao mercado
              </p>
            </div>

            <Button 
              variant="default" 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 glow-accent group-hover:scale-105 transition-transform"
            >
              Iniciar Jornada de Descoberta
            </Button>
          </Card>
        </section>

        {/* How It Works */}
        <section className="max-w-4xl mx-auto space-y-8 pt-8">
          <h3 className="text-2xl md:text-3xl font-display text-center">
            Como Funciona
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3 p-6 rounded-lg bg-card/30 border border-border/50">
              <div className="text-4xl font-display text-primary">1</div>
              <h4 className="font-semibold">Preparação Flow</h4>
              <p className="text-sm text-muted-foreground">
                Ritual de 5 minutos para entrar no estado ideal
              </p>
            </div>

            <div className="text-center space-y-3 p-6 rounded-lg bg-card/30 border border-border/50">
              <div className="text-4xl font-display text-primary">2</div>
              <h4 className="font-semibold">Imersão Diária</h4>
              <p className="text-sm text-muted-foreground">
                30-45 minutos de reflexão profunda e transformação
              </p>
            </div>

            <div className="text-center space-y-3 p-6 rounded-lg bg-card/30 border border-border/50">
              <div className="text-4xl font-display text-primary">3</div>
              <h4 className="font-semibold">Transformação Real</h4>
              <p className="text-sm text-muted-foreground">
                PDF completo com todas suas percepções ao final
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pt-12">
          <p>© 2025 Valor Contido - Transformação Real</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
