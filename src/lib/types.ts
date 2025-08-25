export const timerVariants = ["digital", "other"] as const;

export type Timer = {
  id: string;
  target: Date;
  label: string;
  variant: (typeof timerVariants)[number];
  x: number;
  y: number;
};
