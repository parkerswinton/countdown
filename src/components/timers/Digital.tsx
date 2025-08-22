import { useTimer } from "@/hooks/useTimer";
import type { Timer } from "@/lib/types";

export const Digital = ({ timer }: { timer: Timer }) => {
  const diff = useTimer(timer.target);
  return (
    <h1 className="font-dseg text-4xl">{`${String(diff.days).padStart(2, "0")}:${String(diff.hours).padStart(2, "0")}:${String(diff.minutes).padStart(2, "0")}:${String(diff.seconds).padStart(2, "0")}`}</h1>
  );
};
