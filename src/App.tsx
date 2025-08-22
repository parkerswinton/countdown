import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "./components/Draggable";

export const App = () => {
  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <DndContext onDragEnd={handleDragEnd}>
        <Draggable>
          <h1 className="font-dseg text-4xl">0123456789</h1>
        </Draggable>
      </DndContext>
    </div>
  );
};
