import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import CircularTimer from "@/components/flow/CircularTimer";
import BreathingCircle from "@/components/flow/BreathingCircle";
import { flowRitual, playlists } from "@/data/protocols";
import { getProtocolData, saveActivePlaylist } from "@/utils/storage";
import { ChevronRight, Music } from "lucide-react";

const FlowPrep = () => {
  const navigate = useNavigate();
  const { day } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(new Array(5).fill(false));
  const [isStepActive, setIsStepActive] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState<string>("");
  
  const protocolData = getProtocolData();
  const flowConfig = protocolData?.flowConfig;
  const durations = flowConfig?.durations || {
    step1: 1,
    step2: 1,
    step3: 0.5,
    step4: 1.5,
    step5: 1,
  };
  
  const selectedPlaylistId = flowConfig?.playlistId || "flow-state";
  const selectedPlaylist = playlists.find(p => p.id === selectedPlaylistId);

  const totalSteps = flowRitual.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const step = flowRitual[currentStep];

  // Get duration for current step in seconds
  const getCurrentStepDuration = () => {
    const stepKey = `step${currentStep + 1}` as keyof typeof durations;
    return durations[stepKey] * 60; // Convert minutes to seconds
  };

  useEffect(() => {
    setIsStepActive(false);
    const timer = setTimeout(() => setIsStepActive(true), 100);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Auto-start playlist on mount
  useEffect(() => {
    if (selectedPlaylist && !playlistUrl) {
      setPlaylistUrl(selectedPlaylist.url);
      saveActivePlaylist(selectedPlaylist.id);
    }
  }, [selectedPlaylist, playlistUrl]);

  const handleStepComplete = () => {
    const newCompleted = [...completedSteps];
    newCompleted[currentStep] = true;
    setCompletedSteps(newCompleted);
    
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleManualAdvance = () => {
    handleStepComplete();
  };

  const allStepsCompleted = completedSteps.every(Boolean);

  const renderStepContent = () => {
    const stepDuration = getCurrentStepDuration();
    
    switch (currentStep) {
      case 0: // Prepare o ambiente
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {step.instructions?.map((instruction, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed">
                  {instruction}
                </p>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <CircularTimer 
                duration={stepDuration} 
                isActive={isStepActive}
                onComplete={handleStepComplete}
              />
            </div>
          </div>
        );

      case 1: // Conecte com o corpo
        return (
          <div className="space-y-6">
            <BreathingCircle isActive={isStepActive} />
            <div className="flex justify-center pt-4">
              <CircularTimer 
                duration={stepDuration} 
                isActive={isStepActive}
                onComplete={handleStepComplete}
              />
            </div>
          </div>
        );

      case 2: // Escolha sua trilha (playlist já iniciada)
        return (
          <div className="space-y-6">
            <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
              <Music className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-lg font-semibold mb-2">Playlist Ativa</p>
              <p className="text-sm text-muted-foreground mb-3">{selectedPlaylist?.title}</p>
              <p className="text-xs text-muted-foreground">
                A música continuará tocando durante todo o protocolo
              </p>
            </div>
            <div className="flex justify-center pt-4">
              <CircularTimer 
                duration={stepDuration} 
                isActive={isStepActive}
                onComplete={handleStepComplete}
              />
            </div>
          </div>
        );

      case 3: // Centralize o foco
        return (
          <div className="space-y-6">
            <div className="space-y-4 text-center p-8 rounded-lg bg-gradient-to-b from-primary/5 to-transparent">
              {step.instructions?.map((instruction, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed">
                  {instruction}
                </p>
              ))}
            </div>
            <div className="flex justify-center pt-4">
              <CircularTimer 
                duration={stepDuration} 
                isActive={isStepActive}
                onComplete={handleStepComplete}
              />
            </div>
          </div>
        );

      case 4: // Ancore o estado
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {step.instructions?.map((instruction, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed">
                  {instruction}
                </p>
              ))}
            </div>
            <div className="flex flex-col items-center space-y-4 pt-4">
              <CircularTimer 
                duration={stepDuration} 
                isActive={isStepActive}
                onComplete={handleStepComplete}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      {/* Playlist Player (hidden iframe) */}
      {playlistUrl && (
        <iframe
          src={`${playlistUrl}?autoplay=1&controls=0`}
          allow="autoplay"
          className="hidden"
          title="Background Music"
        />
      )}

      <div className="max-w-3xl w-full mx-auto space-y-8 animate-fade-in">
        {/* Progress Header */}
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Dia {day} de 7</p>
            <h1 className="text-3xl md:text-5xl font-display">
              Prepare-se para Entrar em Flow
            </h1>
          </div>
          
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            Etapa {currentStep + 1} de {totalSteps}
          </p>
        </div>

        {/* Step Card */}
        <Card className="glass-card p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-display">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
          </div>

          {renderStepContent()}

          {/* Manual Advance Button */}
          {!completedSteps[currentStep] && (
            <Button 
              onClick={handleManualAdvance}
              variant="outline"
              className="w-full gap-2 mt-4"
            >
              Avançar para Próxima Etapa
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {currentStep > 0 && !completedSteps.every(Boolean) && (
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Etapa Anterior
            </Button>
          )}
          
          {allStepsCompleted && (
            <Button 
              size="lg" 
              onClick={() => navigate(`/protocolo/${day}`)}
              className="ml-auto bg-primary hover:bg-primary/90 text-primary-foreground glow-accent"
            >
              Começar Protocolo do Dia {day}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowPrep;
