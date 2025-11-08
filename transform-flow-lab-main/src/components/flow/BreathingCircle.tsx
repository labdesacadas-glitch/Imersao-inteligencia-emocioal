import { useEffect, useState } from "react";

interface BreathingCircleProps {
  isActive: boolean;
}

const BreathingCircle = ({ isActive }: BreathingCircleProps) => {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");

  useEffect(() => {
    if (!isActive) return;

    const cycle = () => {
      // Inhale: 4 seconds
      setPhase("inhale");
      setTimeout(() => {
        // Hold: 2 seconds
        setPhase("hold");
        setTimeout(() => {
          // Exhale: 6 seconds
          setPhase("exhale");
          setTimeout(cycle, 6000);
        }, 2000);
      }, 4000);
    };

    cycle();
  }, [isActive]);

  const phaseText = {
    inhale: "Inspire (4 seg)",
    hold: "Segure (2 seg)",
    exhale: "Expire (6 seg)"
  };

  const phaseScale = {
    inhale: "scale-110",
    hold: "scale-110",
    exhale: "scale-100"
  };

  const phaseDuration = {
    inhale: "duration-[4000ms]",
    hold: "duration-[2000ms]",
    exhale: "duration-[6000ms]"
  };

  if (!isActive) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className={`relative w-32 h-32 transition-transform ease-in-out ${phaseDuration[phase]} ${phaseScale[phase]}`}>
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-breathe" />
        <div className="absolute inset-4 rounded-full bg-primary/40 animate-breathe" style={{ animationDelay: "0.2s" }} />
        <div className="absolute inset-8 rounded-full bg-primary/60 animate-breathe" style={{ animationDelay: "0.4s" }} />
      </div>
      
      <p className="text-xl font-semibold text-primary animate-pulse">
        {phaseText[phase]}
      </p>
      
      <p className="text-sm text-muted-foreground text-center max-w-md">
        Inspire profundamente pelo nariz, segure brevemente, e expire lentamente.
        <br />
        Repita três vezes, sentindo o corpo relaxar.
      </p>
    </div>
  );
};

export default BreathingCircle;
