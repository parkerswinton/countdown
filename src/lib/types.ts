export const timerVariants = ["digital", "other"] as const;
export const labelPositions = ["top", "bottom"] as const;

export type Timer = {
  id: string;
  target: Date;
  label: string;
  labelPosition: (typeof labelPositions)[number];
  variant: (typeof timerVariants)[number];
  x: number;
  y: number;
};
