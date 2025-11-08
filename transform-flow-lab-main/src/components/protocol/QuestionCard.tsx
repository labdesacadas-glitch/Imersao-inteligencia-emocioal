import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { saveDayProgress, getDayProgress } from "@/utils/storage";
import { useDebounce } from "@/hooks/useDebounce";

interface QuestionCardProps {
  dayNumber: number;
  questionNumber: number;
  question: string;
}

const QuestionCard = ({ dayNumber, questionNumber, question }: QuestionCardProps) => {
  const [response, setResponse] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const debouncedResponse = useDebounce(response, 2000);

  // Load saved response
  useEffect(() => {
    const dayProgress = getDayProgress(dayNumber);
    if (dayProgress?.responses[`q${questionNumber}`]) {
      const saved = dayProgress.responses[`q${questionNumber}`];
      setResponse(saved);
      setIsAnswered(saved.trim().length > 50); // Consider answered if > 50 chars
    }
  }, [dayNumber, questionNumber]);

  // Auto-save
  useEffect(() => {
    if (debouncedResponse) {
      const dayProgress = getDayProgress(dayNumber) || {
        completed: false,
        responses: {},
        pda: { perception: "", decision: "", action: "" }
      };

      dayProgress.responses[`q${questionNumber}`] = debouncedResponse;
      saveDayProgress(dayNumber, dayProgress);
      setIsAnswered(debouncedResponse.trim().length > 50);
    }
  }, [debouncedResponse, dayNumber, questionNumber]);

  return (
    <Card className="glass-card p-6 space-y-4 hover-lift">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
              {questionNumber}
            </div>
            <h3 className="text-lg leading-relaxed flex-1">{question}</h3>
          </div>
          
          <Textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Escreva sua reflexão profunda aqui... Não há limites."
            className="min-h-[200px] bg-background/50 resize-none"
          />
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{response.length} caracteres</span>
            {isAnswered && (
              <div className="flex items-center gap-2 text-success">
                <Check className="w-4 h-4" />
                <span>Respondida</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
