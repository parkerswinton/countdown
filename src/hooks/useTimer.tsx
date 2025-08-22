import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isPast,
} from "date-fns";

type Duration = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const getDifference = (target: Date) => {
  if (isPast(target)) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const now = new Date();
  return {
    days: differenceInDays(target, now),
    hours: differenceInHours(target, now) % 24,
    minutes: differenceInMinutes(target, now) % 60,
    seconds: differenceInSeconds(target, now) % 60,
  };
};

export const useTimer = (target: Date): Duration => {
  const [difference, setDifference] = useState(getDifference(target));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDifference(getDifference(target));
    }, 250);

    return () => clearInterval(intervalId);
  }, [setDifference, target]);

  return difference;
};
