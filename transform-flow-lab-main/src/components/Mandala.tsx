import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { saveMandalaPosition, getProtocolData } from "@/utils/storage";
import { Download } from "lucide-react";
import rodaImage from "@/assets/roda-frustracao.png";

const stages = [
  { id: "empolgacao", label: "Empolgação", angle: 0 },
  { id: "frustracao", label: "Frustração", angle: 90 },
  { id: "revolta", label: "Revolta", angle: 180 },
  { id: "sonho-molho", label: "Sonho de Molho", angle: 270 },
  { id: "fora-roda", label: "Fora da Roda", angle: -1 } // Center position
];

interface MandalaProps {
  mode: "start" | "end";
  onSelect?: (stage: string) => void;
}

const Mandala = ({ mode, onSelect }: MandalaProps) => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [savedStart, setSavedStart] = useState<string | null>(null);

  useEffect(() => {
    const protocol = getProtocolData();
    if (protocol?.mandala) {
      if (mode === "start" && protocol.mandala.start) {
        setSelectedStage(protocol.mandala.start);
      }
      if (mode === "end") {
        setSavedStart(protocol.mandala.start || null);
        if (protocol.mandala.end) {
          setSelectedStage(protocol.mandala.end);
        }
      }
    }
  }, [mode]);

  const handleStageSelect = (stageId: string) => {
    setSelectedStage(stageId);
    saveMandalaPosition(mode, stageId);
    onSelect?.(stageId);
  };

  const downloadMandala = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    // Background
    ctx.fillStyle = '#0A0A0A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 300;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#6366F1';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw stages
    stages.forEach((stage, index) => {
      if (stage.id === "fora-roda") return;
      
      const angle = (stage.angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.fillStyle = '#6366F1';
      ctx.font = 'bold 20px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(stage.label, x, y);
    });

    // Draw markers
    if (savedStart) {
      const startStage = stages.find(s => s.id === savedStart);
      if (startStage && startStage.angle !== -1) {
        const angle = (startStage.angle * Math.PI) / 180;
        const x = centerX + (radius - 50) * Math.cos(angle);
        const y = centerY + (radius - 50) * Math.sin(angle);
        
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Inter';
        ctx.fillText('INÍCIO', x, y + 40);
      }
    }

    if (selectedStage && mode === "end") {
      const endStage = stages.find(s => s.id === selectedStage);
      if (endStage) {
        let x, y;
        if (endStage.angle === -1) {
          x = centerX;
          y = centerY;
        } else {
          const angle = (endStage.angle * Math.PI) / 180;
          x = centerX + (radius - 50) * Math.cos(angle);
          y = centerY + (radius - 50) * Math.sin(angle);
        }
        
        ctx.fillStyle = '#6366F1';
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Inter';
        ctx.fillText('FIM', x, y + 40);
      }
    }

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mandala-transformacao-${mode}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <Card className="glass-card p-6 md:p-8 space-y-6">
      <div className="space-y-4">
        <h3 className="text-2xl font-display">
          {mode === "start" ? "Onde você está agora?" : "Onde você está hoje?"}
        </h3>
        <p className="text-muted-foreground">
          {mode === "start" 
            ? "Clique no estágio da roda onde você se encontra neste momento."
            : "Após 7 dias de transformação, onde você se encontra agora?"}
        </p>
      </div>

      {/* Mandala Visual */}
      <div className="relative aspect-square max-w-md mx-auto">
        <img 
          src={rodaImage} 
          alt="Roda da Frustração" 
          className="w-full h-full object-contain opacity-60"
        />
        
        {/* Clickable Stage Areas */}
        <div className="absolute inset-0">
          {stages.map((stage) => {
            const isSelected = selectedStage === stage.id;
            const isStart = savedStart === stage.id;
            
            if (stage.id === "fora-roda") {
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageSelect(stage.id)}
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 transition-all ${
                    isSelected 
                      ? 'bg-primary border-primary scale-110' 
                      : 'bg-primary/10 border-primary/50 hover:bg-primary/20'
                  }`}
                  title={stage.label}
                >
                  <span className="text-xs font-semibold">Livre</span>
                </button>
              );
            }

            const angle = stage.angle;
            const radius = 40; // percentage from center
            const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

            return (
              <button
                key={stage.id}
                onClick={() => handleStageSelect(stage.id)}
                className={`absolute w-20 h-20 rounded-full border-2 transition-all ${
                  isSelected 
                    ? 'bg-primary border-primary scale-110' 
                    : isStart
                    ? 'bg-success border-success'
                    : 'bg-card/50 border-border hover:bg-card'
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={stage.label}
              >
                <span className="text-[10px] font-semibold">{stage.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {mode === "end" && savedStart && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-success" />
            <span>Início</span>
          </div>
        )}
        {selectedStage && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary" />
            <span>{mode === "start" ? "Posição Atual" : "Posição Final"}</span>
          </div>
        )}
      </div>

      {selectedStage && mode === "end" && (
        <Button 
          onClick={downloadMandala}
          variant="outline"
          className="w-full gap-2"
        >
          <Download className="w-4 h-4" />
          Salvar Minha Mandala
        </Button>
      )}
    </Card>
  );
};

export default Mandala;
