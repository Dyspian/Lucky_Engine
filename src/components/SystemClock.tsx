"use client";

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

const SystemClock = () => {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial date
    setDate(new Date());

    // Update every second
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!date) return null; // Avoid hydration mismatch

  return (
    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-card/50 px-3 py-1.5 rounded-full border border-border/20 backdrop-blur-sm">
      <Clock size={14} className="text-emerald" />
      <span className="uppercase tracking-wider text-[10px] sm:text-xs">
        {format(date, "EEEE d MMMM yyyy HH:mm", { locale: nl })}
      </span>
    </div>
  );
};

export default SystemClock;