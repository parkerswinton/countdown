import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "./components/Draggable";
import type { Timer } from "./lib/types";
import { Digital } from "./components/timers/Digital";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { useGlobalTicker } from "./hooks/useTimer";

const timersAtom = atomWithStorage<Timer[]>("timers", []);

export const App = () => {
  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);
  };
  useGlobalTicker();
  const [timers, setTimers] = useAtom(timersAtom);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <DndContext onDragEnd={handleDragEnd}>
        {timers.map((t) => (
          <Draggable key={t.id} id={t.id}>
            <Digital timer={t} />
          </Draggable>
        ))}

        <button
          onClick={() =>
            setTimers([
              ...timers,
              { id: "timer1", target: new Date(2025, 10, 12, 4, 7, 5) },
            ])
          }
        >
          HELLO
        </button>
      </DndContext>
    </div>
  );
};
