import { useTimer, type Duration } from "@/hooks/useTimer";
import type { Timer } from "@/lib/types";

const formatTimer = (dur: Duration) => {
  return `${String(dur.days).padStart(2, "0")}:${String(dur.hours).padStart(2, "0")}:${String(dur.minutes).padStart(2, "0")}:${String(dur.seconds).padStart(2, "0")}`;
};

export const Digital = ({
  timer,
}: {
  timer: Omit<Timer, "x" | "y" | "variant">;
}) => {
  const diff = useTimer(timer.target);
  return (
    <div className="flex flex-col select-none">
      {timer.label && (
        <p
          className={`self-center border-1 border-zinc-400 ${timer.labelPosition === "bottom" ? "order-last rounded-b-sm border-t-0" : "rounded-t-sm border-b-0"} bg-zinc-800 px-2 text-2xl tracking-wide text-zinc-100`}
        >
          {timer.label}
        </p>
      )}
      <div className="flex flex-col rounded-sm border-1 border-zinc-400 bg-zinc-800 p-2 shadow">
        <p className="font-dseg self-end text-4xl text-red-500">
          {formatTimer(diff)}
        </p>
        <div className="flex justify-end gap-[58px] pr-1 text-xs font-bold text-zinc-200">
          <p>d</p>
          <p>h</p>
          <p>m</p>
          <p>s</p>
        </div>
      </div>
    </div>
  );
};
