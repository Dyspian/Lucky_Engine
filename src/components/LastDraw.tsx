"use client";

import React from 'react';
import { Draw } from "@/lib/euromillions-provider";
import Ball from "./Ball";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface LastDrawProps {
  draw: Draw;
}

const LastDraw = ({ draw }: LastDrawProps) => {
  const formattedDate = format(new Date(draw.date), "EEEE d MMMM yyyy", { locale: nl });

  return (
    <Card className="border-none bg-secondary text-white shadow-2xl overflow-hidden rounded-2xl"> {/* Changed bg-indigo-900 to bg-secondary and added rounded-2xl */}
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground uppercase tracking-widest"> {/* Adjusted text color */}
          <CalendarDays size={16} className="text-primary" /> {/* Added primary color to icon */}
          Laatste Trekking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-2xl font-bold capitalize mb-1">{formattedDate}</p>
            <p className="text-muted-foreground text-sm">Officiële resultaten van de laatste trekking</p> {/* Adjusted text color */}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex gap-2">
              {draw.numbers.map((n, i) => (
                <Ball key={`last-n-${i}`} value={n} delay={i * 0.05} />
              ))}
            </div>
            <div className="w-px h-8 bg-white/10 mx-2 hidden sm:block" /> {/* Adjusted divider color */}
            <div className="flex gap-2">
              {draw.stars.map((s, i) => (
                <Ball key={`last-s-${i}`} value={s} variant="star" delay={0.3 + i * 0.05} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LastDraw;