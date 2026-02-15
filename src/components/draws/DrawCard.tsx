// src/components/draws/DrawCard.tsx

"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Draw, DrawPrize } from "@/lib/euromillions/schemas";
import Ball from "@/components/Ball";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Trophy } from "lucide-react";
import { formatDate, formatEuro } from "@/utils/formatters";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DrawCardProps {
  draw: Draw;
  index: number;
}

const DrawCard = ({ draw, index }: DrawCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const prizeBreakdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className="bg-card border border-border/20 shadow-xl rounded-lg overflow-hidden"
        style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 1px 5px rgba(0,0,0,0.1)' }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex flex-col sm:flex-row items-center sm:justify-between text-sm font-bold text-foreground text-center sm:text-left gap-2"> {/* Adjusted for mobile stacking */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-extra-wide text-muted-foreground text-small-caps">
                Trekking {draw.draw_id}
              </span>
              {draw.has_winner && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-depth text-emerald text-[10px] font-semibold">
                  <Trophy size={12} /> Jackpot Winnaar
                </span>
              )}
            </div>
            <span className="text-xs text-secondary-foreground">{formatDate(draw.date)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col items-center justify-between gap-4"> {/* Always column on mobile */}
            <div className="flex flex-wrap gap-1.5 items-center justify-center"> {/* Centered balls on mobile */}
              <div className="flex gap-1.5">
                {draw.numbers.map((n, i) => (
                  <Link key={`draw-${draw.id}-n-${i}`} to={`/nummers/${n}`} className="hover:scale-110 transition-transform">
                    <Ball value={n} delay={i * 0.03} />
                  </Link>
                ))}
              </div>
              <div className="w-px h-6 bg-border/50 mx-2 hidden sm:block" /> {/* Hide separator on mobile */}
              <div className="flex gap-1.5 mt-2 sm:mt-0"> {/* Added margin-top for stars on mobile */}
                {draw.stars.map((s, i) => (
                  <Link key={`draw-${draw.id}-s-${i}`} to={`/sterren/${s}`} className="hover:scale-110 transition-transform">
                    <Ball value={s} variant="star" delay={0.2 + i * 0.03} />
                  </Link>
                ))}
              </div>
            </div>
            
            {draw.prizes.length > 0 && (
              <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full"> {/* Full width on mobile */}
                <CollapsibleTrigger asChild>
                  <motion.button
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-120 px-3 py-1 rounded-md bg-card/50 border border-border/20 hover:bg-card/80 w-full justify-center" // Full width and centered
                    whileTap={{ scale: 0.98 }}
                  >
                    Prijzen Details
                    <ChevronDown size={14} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
                  </motion.button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 overflow-hidden">
                  <motion.div
                    initial="hidden"
                    animate={isOpen ? "visible" : "hidden"}
                    variants={prizeBreakdownVariants}
                    className="bg-background/50 border border-border/20 rounded-md p-3"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 text-small-caps">Prijzen Overzicht</h4>
                    <div className="overflow-x-auto"> {/* Added horizontal scroll for tables */}
                      <table className="w-full text-left text-xs text-secondary-foreground">
                        <thead>
                          <tr className="border-b border-border/20">
                            <th className="py-1 pr-2 font-semibold">Match</th>
                            <th className="py-1 px-2 font-semibold">Winnaars</th>
                            <th className="py-1 pl-2 text-right font-semibold">Prijs</th>
                          </tr>
                        </thead>
                        <tbody>
                          {draw.prizes.map((prize: DrawPrize, i: number) => (
                            <tr key={i} className="border-b border-border/10 last:border-b-0">
                              <td className="py-1 pr-2">
                                {prize.matched_numbers} <span className="text-muted-foreground">num</span> + {prize.matched_stars} <span className="text-muted-foreground">ster</span>
                              </td>
                              <td className="py-1 px-2">{prize.winners}</td>
                              <td className="py-1 pl-2 text-right font-medium text-emerald">{formatEuro(prize.prize)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DrawCard;