import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { saveDayProgress, getDayProgress } from "@/utils/storage";
import { useDebounce } from "@/hooks/useDebounce";

interface PDASectionProps {
  dayNumber: number;
  perception: string;
  decision: string;
  action: string;
}

const PDASection = ({ dayNumber, perception, decision, action }: PDASectionProps) => {
  const [perceptionText, setPerceptionText] = useState("");
  const [decisionText, setDecisionText] = useState("");
  const [actionText, setActionText] = useState("");

  const debouncedP = useDebounce(perceptionText, 2000);
  const debouncedD = useDebounce(decisionText, 2000);
  const debouncedA = useDebounce(actionText, 2000);

  // Load saved PDA
  useEffect(() => {
    const dayProgress = getDayProgress(dayNumber);
    if (dayProgress?.pda) {
      setPerceptionText(dayProgress.pda.perception || "");
      setDecisionText(dayProgress.pda.decision || "");
      setActionText(dayProgress.pda.action || "");
    }
  }, [dayNumber]);

  // Auto-save
  useEffect(() => {
    const dayProgress = getDayProgress(dayNumber) || {
      completed: false,
      responses: {},
      pda: { perception: "", decision: "", action: "" }
    };

    dayProgress.pda = {
      perception: debouncedP,
      decision: debouncedD,
      action: debouncedA
    };
    
    saveDayProgress(dayNumber, dayProgress);
  }, [debouncedP, debouncedD, debouncedA, dayNumber]);

  return (
    <div className="space-y-6">
      {/* Perception */}
      <Card className="glass-card p-6 space-y-4 border-l-4 border-l-primary">
        <div className="space-y-2">
          <h3 className="text-xl font-display text-primary">P - PERCEPÇÃO</h3>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {perception}
          </p>
        </div>
        <Textarea
          value={perceptionText}
          onChange={(e) => setPerceptionText(e.target.value)}
          placeholder="Preencha os campos acima com suas percepções..."
          className="min-h-[120px] bg-background/50"
        />
      </Card>

      {/* Decision */}
      <Card className="glass-card p-6 space-y-4 border-l-4 border-l-primary">
        <div className="space-y-2">
          <h3 className="text-xl font-display text-primary">D - DECISÃO</h3>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {decision}
          </p>
        </div>
        <Textarea
          value={decisionText}
          onChange={(e) => setDecisionText(e.target.value)}
          placeholder="Escreva sua decisão clara e específica..."
          className="min-h-[120px] bg-background/50"
        />
      </Card>

      {/* Action */}
      <Card className="glass-card p-6 space-y-4 border-l-4 border-l-primary">
        <div className="space-y-2">
          <h3 className="text-xl font-display text-primary">A - AÇÃO PARA HOJE</h3>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {action}
          </p>
        </div>
        <Textarea
          value={actionText}
          onChange={(e) => setActionText(e.target.value)}
          placeholder="Descreva sua ação concreta e específica para hoje..."
          className="min-h-[150px] bg-background/50"
        />
      </Card>
    </div>
  );
};

export default PDASection;
