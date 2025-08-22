import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "./components/Draggable";
import { useTimer } from "./hooks/useTimer";

export const App = () => {
  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);
  };

  const diff = useTimer(new Date(2025, 10, 12, 4, 7, 5));

  return (
    <div className="h-screen w-screen overflow-hidden">
      <DndContext onDragEnd={handleDragEnd}>
        <Draggable>
          <h1 className="font-dseg text-4xl">{`${String(diff.days).padStart(2, "0")}:${String(diff.hours).padStart(2, "0")}:${String(diff.minutes).padStart(2, "0")}:${String(diff.seconds).padStart(2, "0")}`}</h1>
        </Draggable>
      </DndContext>
    </div>
  );
};
