import { useDraggable } from "@dnd-kit/core";
import type { ReactNode } from "react";

type DraggableProps = {
  id: string;
  x: number;
  y: number;
  children: ReactNode;
};

export const Draggable = ({ id, x, y, children }: DraggableProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        position: "absolute",
        top: y,
        left: x,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};
