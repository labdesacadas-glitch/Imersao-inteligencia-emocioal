import { useEffect, useState } from "react";

interface CircularTimerProps {
  duration: number; // in seconds
  isActive: boolean;
  onComplete?: () => void;
}

const CircularTimer = ({ duration, isActive, onComplete }: CircularTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, duration, onComplete]);

  const percentage = ((duration - timeLeft) / duration) * 100;
  const strokeDashoffset = 339.292 - (339.292 * percentage) / 100; // 2 * π * 54 (radius)

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="hsl(var(--border))"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="hsl(var(--primary))"
          strokeWidth="8"
          fill="none"
          strokeDasharray="339.292"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      
      {/* Time display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold font-display">
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTimer;
