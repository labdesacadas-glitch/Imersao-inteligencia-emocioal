import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Flame } from "lucide-react";
import Mandala from "@/components/Mandala";
import { getProtocolData, getAllDaysData, completeDay } from "@/utils/storage";
import { generateProtocolPDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";
import { frustrationProtocol, skillsProtocol } from "@/data/protocols";

const DaySeven = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [oldIdentity, setOldIdentity] = useState("");
  const [newIdentity, setNewIdentity] = useState<string[]>(["", "", "", "", ""]);
  const [contract, setContract] = useState({
    commitment: "",
    signature: "",
    date: new Date().toLocaleDateString('pt-BR')
  });
  const [actionPlan, setActionPlan] = useState({
    week1: "",
    week2: "",
    week3: "",
    week4: ""
  });
  const [accountabilityPartner, setAccountabilityPartner] = useState({
    name: "",
    email: ""
  });
  const [firstAction, setFirstAction] = useState("");
  const [finalQuestions, setFinalQuestions] = useState<Record<string, string>>({});

  const protocol = getProtocolData();
  const allDays = getAllDaysData();
  
  const protocolData = protocol?.protocolType === "frustration" 
    ? frustrationProtocol 
    : skillsProtocol;

  const handleDestroySymbolically = () => {
    toast({
      title: "Identidade antiga destruída",
      description: "Você simbolicamente destruiu sua velha identidade. Agora, renasça.",
      variant: "default"
    });
  };

  const handleGeneratePDF = async () => {
    toast({
      title: "Gerando PDF...",
      description: "Preparando seu documento de transformação completo.",
    });

    try {
      await generateProtocolPDF();
      toast({
        title: "PDF gerado com sucesso!",
        description: "Seu documento de transformação foi salvo.",
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o documento. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleComplete = () => {
    completeDay(7);
    toast({
      title: "Protocolo Completo! 🎉",
      description: "Você completou sua jornada de transformação. Parabéns!",
    });
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-24">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <div className="text-5xl mb-2">🔥</div>
            <h1 className="text-3xl md:text-5xl font-display">
              DIA 7: O RENASCIMENTO
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Declaração de Liberdade da Roda
            </p>
          </div>
        </div>

        {/* PART 1: Burial of Old Identity */}
        <Card className="glass-card p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-display flex items-center gap-2">
              <Flame className="w-6 h-6 text-destructive" />
              Parte 1: O Enterro da Velha Identidade
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Liste todas as características, crenças e comportamentos da sua velha identidade que te mantinham preso na roda.
              Seja específico. Escreva tudo que você VAI DEIXAR PARA TRÁS.
            </p>
          </div>

          <Textarea
            value={oldIdentity}
            onChange={(e) => setOldIdentity(e.target.value)}
            placeholder="Ex: Eu era alguém que desistia na primeira dificuldade. Eu acreditava que sucesso era para os outros. Eu tinha medo de ser visto..."
            className="min-h-[200px] bg-background/50"
          />

          <Button 
            onClick={handleDestroySymbolically}
            variant="destructive"
            className="w-full gap-2"
          >
            <Flame className="w-4 h-4" />
            Destruir Simbolicamente
          </Button>
        </Card>

        {/* PART 2: Birth of New Identity */}
        <Card className="glass-card p-6 md:p-8 space-y-8">
          <h2 className="text-2xl font-display">
            Parte 2: O Nascimento da Nova Identidade
          </h2>

          {/* Review of 6 days */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Revisão dos 6 Dias Anteriores</h3>
            {[1, 2, 3, 4, 5, 6].map((dayNum) => {
              const dayContent = protocolData[dayNum - 1];
              const dayData = allDays[dayNum];

              return (
                <Card key={dayNum} className="p-4 bg-card/30">
                  <h4 className="font-semibold mb-2">
                    {dayContent.emoji} Dia {dayNum}: {dayContent.title}
                  </h4>
                  {dayData?.pda && (
                    <div className="text-sm space-y-2 text-muted-foreground">
                      <p><strong>Percepção:</strong> {dayData.pda.perception || "Não preenchido"}</p>
                      <p><strong>Decisão:</strong> {dayData.pda.decision || "Não preenchido"}</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <Separator />

          {/* New Identity */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Minha Nova Identidade</h3>
            <p className="text-sm text-muted-foreground">
              Liste 5 características da pessoa que você ESCOLHE SER a partir de hoje:
            </p>
            {newIdentity.map((_, index) => (
              <Input
                key={index}
                value={newIdentity[index]}
                onChange={(e) => {
                  const updated = [...newIdentity];
                  updated[index] = e.target.value;
                  setNewIdentity(updated);
                }}
                placeholder={`Característica ${index + 1}`}
                className="bg-background/50"
              />
            ))}
          </div>

          <Separator />

          {/* Contract */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contrato Inegociável</h3>
            <Textarea
              value={contract.commitment}
              onChange={(e) => setContract({...contract, commitment: e.target.value})}
              placeholder="Eu, [seu nome], me comprometo a..."
              className="min-h-[150px] bg-background/50"
            />
            
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                value={contract.signature}
                onChange={(e) => setContract({...contract, signature: e.target.value})}
                placeholder="Sua assinatura"
                className="bg-background/50"
              />
              <Input
                value={contract.date}
                disabled
                className="bg-background/50"
              />
            </div>
          </div>

          <Separator />

          {/* Action Plan 30 days */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Plano de Ação - 30 Dias</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Semana 1</label>
                <Textarea
                  value={actionPlan.week1}
                  onChange={(e) => setActionPlan({...actionPlan, week1: e.target.value})}
                  placeholder="Ações específicas da primeira semana..."
                  className="mt-1 bg-background/50"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Semana 2</label>
                <Textarea
                  value={actionPlan.week2}
                  onChange={(e) => setActionPlan({...actionPlan, week2: e.target.value})}
                  placeholder="Ações específicas da segunda semana..."
                  className="mt-1 bg-background/50"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Semana 3</label>
                <Textarea
                  value={actionPlan.week3}
                  onChange={(e) => setActionPlan({...actionPlan, week3: e.target.value})}
                  placeholder="Ações específicas da terceira semana..."
                  className="mt-1 bg-background/50"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Semana 4</label>
                <Textarea
                  value={actionPlan.week4}
                  onChange={(e) => setActionPlan({...actionPlan, week4: e.target.value})}
                  placeholder="Ações específicas da quarta semana..."
                  className="mt-1 bg-background/50"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* PART 3: Accountability */}
        <Card className="glass-card p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-display">
            Parte 3: Ritual de Compromisso
          </h2>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Escolha alguém que vai te acompanhar nessa jornada (opcional, mas recomendado):
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                value={accountabilityPartner.name}
                onChange={(e) => setAccountabilityPartner({...accountabilityPartner, name: e.target.value})}
                placeholder="Nome do parceiro de accountability"
                className="bg-background/50"
              />
              <Input
                type="email"
                value={accountabilityPartner.email}
                onChange={(e) => setAccountabilityPartner({...accountabilityPartner, email: e.target.value})}
                placeholder="Email (opcional)"
                className="bg-background/50"
              />
            </div>
          </div>
        </Card>

        {/* PART 4: First Action */}
        <Card className="glass-card p-6 md:p-8 space-y-6">
          <h2 className="text-2xl font-display">
            Parte 4: Primeira Ação
          </h2>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Qual é a PRIMEIRA AÇÃO que você vai fazer HOJE, ainda dentro das próximas 24 horas,
              que representa sua nova identidade?
            </p>
            
            <Textarea
              value={firstAction}
              onChange={(e) => setFirstAction(e.target.value)}
              placeholder="Seja específico e realista. Ex: Vou postar meu primeiro conteúdo às 20h hoje..."
              className="min-h-[150px] bg-background/50"
            />
          </div>
        </Card>

        {/* Mandala */}
        <Mandala mode="end" />

        {/* Final Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            onClick={handleGeneratePDF}
            size="lg"
            variant="outline"
            className="flex-1 gap-2"
          >
            <Download className="w-4 h-4" />
            Gerar PDF Completo
          </Button>
          
          <Button 
            onClick={handleComplete}
            size="lg"
            className="flex-1 bg-primary hover:bg-primary/90 glow-accent"
          >
            Finalizar Transformação
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DaySeven;
