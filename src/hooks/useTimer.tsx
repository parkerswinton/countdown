import { useEffect } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isPast,
} from "date-fns";
import { atom, useAtomValue, useSetAtom } from "jotai";

type Duration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const tickAtom = atom(new Date());

export const useGlobalTicker = () => {
  const setTicker = useSetAtom(tickAtom);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTicker(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setTicker]);
};

const getDifference = (current: Date, target: Date) => {
  if (isPast(target)) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: differenceInDays(target, current),
    hours: differenceInHours(target, current) % 24,
    minutes: differenceInMinutes(target, current) % 60,
    seconds: differenceInSeconds(target, current) % 60,
  };
};

export const useTimer = (target: Date): Duration => {
  const current = useAtomValue(tickAtom);
  return getDifference(current, target);
};
