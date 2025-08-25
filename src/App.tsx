import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "./components/Draggable";
import type { Timer } from "./lib/types";
import { Digital } from "./components/timers/Digital";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { useGlobalTicker } from "./hooks/useTimer";
import { AddTimerDialog } from "./components/AddTimerDialog";
import { ThemeProvider } from "./components/ui/theme-provider";
import { ThemeToggle } from "./components/ui/theme-toggle";

const timersAtom = atomWithStorage<Timer[]>("timers", []);

export const App = () => {
  const [timers, setTimers] = useAtom(timersAtom);
  useGlobalTicker();

  const handleDragEnd = (e: DragEndEvent) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === e.active.id
          ? { ...t, x: t.x + e.delta.x, y: t.y + e.delta.y }
          : t,
      ),
    );
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-screen overflow-hidden">
        <DndContext onDragEnd={handleDragEnd}>
          {timers.map((t) => (
            <Draggable key={t.id} id={t.id} x={t.x} y={t.y}>
              {t.variant === "digital" ? <Digital timer={t} /> : null}
            </Draggable>
          ))}
        </DndContext>
        <AddTimerDialog
          onAdd={(newTimer) => setTimers([...timers, newTimer])}
        />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
};
