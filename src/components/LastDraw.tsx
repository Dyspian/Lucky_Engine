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
    <Card className="border border-border/20 bg-card text-foreground shadow-xl overflow-hidden rounded-lg transition-shadow duration-120"
      style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 1px 5px rgba(0,0,0,0.1)' }} // Deeper shadow for cards
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-extra-wide text-small-caps">
          <CalendarDays size={16} className="text-emerald" />
          Laatste Trekking
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"> {/* Nog compactere gap */}
          <div>
            <p className="text-lg sm:text-2xl font-bold capitalize mb-0.5 text-foreground">{formattedDate}</p> {/* Aangepaste tekstgrootte en mb */}
            <p className="text-muted-foreground text-xs sm:text-sm">Officiële resultaten van de laatste trekking</p> {/* Kleinere tekst op mobiel */}
          </div>
          <div className="flex flex-wrap gap-1 items-center"> {/* Nog compactere gap voor ballen */}
            <div className="flex gap-1"> {/* Nog compactere gap */}
              {draw.numbers.map((n, i) => (
                <Ball key={`last-n-${i}`} value={n} delay={i * 0.05} />
              ))}
            </div>
            <div className="w-px h-6 bg-border/50 mx-1 hidden sm:block" /> {/* Kleinere separator */}
            <div className="flex gap-1"> {/* Nog compactere gap */}
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