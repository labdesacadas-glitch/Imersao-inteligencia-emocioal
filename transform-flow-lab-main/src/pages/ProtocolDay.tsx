import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Lock } from "lucide-react";
import QuestionCard from "@/components/protocol/QuestionCard";
import PDASection from "@/components/protocol/PDASection";
import { getProtocolData, completeDay, isDayLocked, getDayProgress } from "@/utils/storage";
import { frustrationProtocol, skillsProtocol } from "@/data/protocols";
import { useToast } from "@/hooks/use-toast";

const ProtocolDay = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const dayNumber = parseInt(day || "1");
  
  const [protocolContent, setProtocolContent] = useState<any>(null);
  const [lockStatus, setLockStatus] = useState<{ locked: boolean; timeRemaining?: number }>({ locked: false });

  useEffect(() => {
    const protocol = getProtocolData();
    if (!protocol) {
      navigate("/");
      return;
    }

    // Check if day is locked
    const status = isDayLocked(dayNumber);
    setLockStatus(status);

    if (status.locked && status.timeRemaining) {
      const hours = Math.floor(status.timeRemaining);
      const minutes = Math.floor((status.timeRemaining % 1) * 60);
      
      toast({
        title: "Dia bloqueado",
        description: `Este dia será liberado em ${hours}h ${minutes}min. A transformação precisa de tempo para integração.`,
        variant: "destructive"
      });
      
      navigate("/");
      return;
    }

    // Load correct protocol content
    const content = protocol.protocolType === "frustration" 
      ? frustrationProtocol[dayNumber - 1]
      : skillsProtocol[dayNumber - 1];
    
    setProtocolContent(content);
  }, [dayNumber, navigate, toast]);

  const handleCompleteDay = async () => {
    const dayProgress = getDayProgress(dayNumber);
    
    // Check if all questions are answered
    const questionsAnswered = dayProgress?.responses && 
      Object.keys(dayProgress.responses).length === protocolContent.questions.length;
    
    const pdaFilled = dayProgress?.pda && 
      dayProgress.pda.perception && 
      dayProgress.pda.decision && 
      dayProgress.pda.action;

    if (!questionsAnswered || !pdaFilled) {
      toast({
        title: "Protocolo incompleto",
        description: "Por favor, responda todas as perguntas e preencha o PDA antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    // Generate PDF
    toast({
      title: "Gerando PDF...",
      description: "Seu PDF está sendo gerado. Isso pode levar alguns segundos.",
    });

    try {
      const { generateDayPDF } = await import("@/utils/pdfGenerator");
      await generateDayPDF(dayNumber);
      
      completeDay(dayNumber);
      
      if (dayNumber < 7) {
        toast({
          title: `PDF gerado! Dia ${dayNumber} concluído!`,
          description: "Suas reflexões foram salvas. Volte amanhã para continuar sua jornada.",
        });
        navigate("/");
      } else {
        // Redirect to special Day 7 page
        toast({
          title: "PDF gerado! Protocolo concluído!",
          description: "Prepare-se para a transformação final.",
        });
        navigate("/dia-7");
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      toast({
        title: "Erro ao gerar PDF",
        description: "Houve um problema ao gerar o PDF. Suas respostas foram salvas.",
        variant: "destructive",
      });
    }
  };

  if (!protocolContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Lock className="w-16 h-16 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  const totalQuestions = protocolContent.questions.length;
  const answeredQuestions = getDayProgress(dayNumber)?.responses 
    ? Object.keys(getDayProgress(dayNumber)!.responses).length 
    : 0;
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-24">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Dia {dayNumber} de 7</p>
            <Progress value={progress} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {answeredQuestions} de {totalQuestions} perguntas respondidas
            </p>
          </div>
        </div>

        {/* Day Header */}
        <div className="text-center space-y-2">
          <div className="text-5xl mb-2">{protocolContent.emoji}</div>
          <h1 className="text-3xl md:text-5xl font-display">
            DIA {dayNumber}: {protocolContent.title}
          </h1>
          <p className="text-lg text-muted-foreground">{protocolContent.subtitle}</p>
        </div>

        {/* Journey Section */}
        <Card className="glass-card p-6 md:p-8">
          <h2 className="text-2xl font-display mb-6">Jornada do Dia</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">De onde você está vindo</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {protocolContent.journey.from}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Onde você está</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {protocolContent.journey.where}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Para onde está indo</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {protocolContent.journey.to}
              </p>
            </div>
          </div>
        </Card>

        {/* Questions */}
        {protocolContent.questions.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display">Perguntas Reflexivas Profundas</h2>
            {protocolContent.questions.map((question: string, index: number) => (
              <QuestionCard
                key={index}
                dayNumber={dayNumber}
                questionNumber={index + 1}
                question={question}
              />
            ))}
          </div>
        )}

        {/* PDA Section */}
        {protocolContent.pda.perception && (
          <div className="space-y-6">
            <h2 className="text-2xl font-display">PDA do Dia {dayNumber}</h2>
            <PDASection
              dayNumber={dayNumber}
              perception={protocolContent.pda.perception}
              decision={protocolContent.pda.decision}
              action={protocolContent.pda.action}
            />
          </div>
        )}

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              Salvar e Sair
            </Button>
            
            <Button 
              size="lg"
              onClick={handleCompleteDay}
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-accent gap-2"
            >
              {dayNumber < 7 ? "Gerar PDF e Concluir Dia" : "Gerar PDF e Finalizar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolDay;
