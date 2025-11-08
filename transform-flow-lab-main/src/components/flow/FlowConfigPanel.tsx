import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { playlists } from "@/data/protocols";
import { FlowConfig } from "@/utils/storage";
import { Music, Timer, Sparkles } from "lucide-react";

interface FlowConfigPanelProps {
  onComplete: (config: FlowConfig) => void;
}

const FlowConfigPanel = ({ onComplete }: FlowConfigPanelProps) => {
  const [config, setConfig] = useState<FlowConfig>({
    playlistId: "flow-state",
    durations: {
      step1: 1,
      step2: 1,
      step3: 0.5,
      step4: 1.5,
      step5: 1,
    }
  });

  const totalMinutes = Object.values(config.durations).reduce((sum, val) => sum + val, 0);

  const updateDuration = (step: keyof FlowConfig['durations'], value: number) => {
    setConfig(prev => ({
      ...prev,
      durations: {
        ...prev.durations,
        [step]: value
      }
    }));
  };

  return (
    <Card className="glass-card p-8 space-y-8 max-w-2xl mx-auto animate-fade-in">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-display">Configure Seu Ritual de Flow</h2>
        </div>
        <p className="text-muted-foreground">
          Personalize a duração de cada etapa e escolha sua trilha sonora
        </p>
      </div>

      {/* Playlist Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-primary" />
          <Label className="text-base font-semibold">Trilha Sonora</Label>
        </div>
        <Select value={config.playlistId} onValueChange={(value) => setConfig(prev => ({ ...prev, playlistId: value }))}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {playlists.map((playlist) => (
              <SelectItem key={playlist.id} value={playlist.id}>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{playlist.title}</span>
                  <span className="text-xs text-muted-foreground">{playlist.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Duration Sliders */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2 mb-4">
          <Timer className="w-5 h-5 text-primary" />
          <Label className="text-base font-semibold">Duração das Etapas (minutos)</Label>
        </div>

        <DurationSlider
          label="1. Prepare o Ambiente"
          value={config.durations.step1}
          onChange={(val) => updateDuration('step1', val)}
        />

        <DurationSlider
          label="2. Conecte com o Corpo"
          value={config.durations.step2}
          onChange={(val) => updateDuration('step2', val)}
        />

        <DurationSlider
          label="3. Escolha sua Trilha"
          value={config.durations.step3}
          onChange={(val) => updateDuration('step3', val)}
          max={2}
        />

        <DurationSlider
          label="4. Centralize o Foco"
          value={config.durations.step4}
          onChange={(val) => updateDuration('step4', val)}
        />

        <DurationSlider
          label="5. Ancore o Estado"
          value={config.durations.step5}
          onChange={(val) => updateDuration('step5', val)}
        />
      </div>

      {/* Total Time */}
      <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
        <p className="text-sm text-muted-foreground">Tempo Total do Ritual</p>
        <p className="text-3xl font-display text-primary mt-1">
          {totalMinutes} minutos
        </p>
      </div>

      <Button 
        onClick={() => onComplete(config)}
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-accent"
      >
        Confirmar e Começar
      </Button>
    </Card>
  );
};

interface DurationSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

const DurationSlider = ({ label, value, onChange, max = 5 }: DurationSliderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">{label}</Label>
        <span className="text-sm font-semibold text-primary">{value} min</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={0.5}
        max={max}
        step={0.5}
        className="w-full"
      />
    </div>
  );
};

export default FlowConfigPanel;
