import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "./components/Draggable";
import type { Timer } from "./lib/types";
import { Digital } from "./components/timers/Digital";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { useGlobalTicker } from "./hooks/useTimer";
import { AddTimerDialog } from "./components/AddTimerDialog";

const timersAtom = atomWithStorage<Timer[]>("timers", []);

export const App = () => {
  const [timers, setTimers] = useAtom(timersAtom);
  useGlobalTicker();

  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <DndContext onDragEnd={handleDragEnd}>
        {timers.map((t) => (
          <Draggable key={t.id} id={t.id}>
            <Digital timer={t} />
          </Draggable>
        ))}
      </DndContext>
      <AddTimerDialog onAdd={(newTimer) => setTimers([...timers, newTimer])} />
    </div>
  );
};
