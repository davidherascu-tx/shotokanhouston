"use client";

import { useEffect, useState } from "react";

// March 6, 2027, 00:00 Central (CST, UTC-6)
const EVENT_START = new Date("2027-03-06T00:00:00-06:00").getTime();

function remaining() {
  const diff = Math.max(0, EVENT_START - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    over: diff === 0,
  };
}

export default function GasshukuCountdown() {
  const [t, setT] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setT(remaining());
    const id = setInterval(() => setT(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { label: "Days", value: t?.days },
    { label: "Hours", value: t?.hours },
    { label: "Minutes", value: t?.minutes },
    { label: "Seconds", value: t?.seconds },
  ];

  if (t?.over) {
    return (
      <p className="font-display text-xl uppercase tracking-widest text-gold">
        The Gasshuku is underway — Oss!
      </p>
    );
  }

  return (
    <div
      className="grid grid-cols-4 gap-2 sm:gap-4"
      role="timer"
      aria-label="Time until the Gasshuku begins"
    >
      {cells.map((c) => (
        <div
          key={c.label}
          className="rounded-sm border border-gold/40 bg-black/40 px-2 py-3 text-center backdrop-blur-sm sm:px-4 sm:py-4"
        >
          <div className="font-display text-3xl font-bold tabular-nums text-bone sm:text-5xl">
            {c.value === undefined ? "--" : String(c.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-gold sm:text-xs">
            {c.label}
          </div>
        </div>
      ))}
    </div>
  );
}
