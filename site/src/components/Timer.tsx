import { useEffect, useState } from "react";

interface TimerProps {
  startTime: number;
  timeLimitMinutes: number;
  onTimeUp: () => void;
}

export function Timer({ startTime, timeLimitMinutes, onTimeUp }: TimerProps) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const remaining = timeLimitMinutes * 60 * 1000 - elapsed;
      if (remaining <= 0) {
        setDisplay("00:00");
        onTimeUp();
        return;
      }
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      setDisplay(`${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startTime, timeLimitMinutes, onTimeUp]);

  return (
    <div className="font-mono text-lg font-bold tabular-nums text-primary-700">
      {display}
    </div>
  );
}
