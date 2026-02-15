"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket } from "@/lib/generator";
import Ball from "./Ball";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, TrendingUp, ShieldCheck, Share2, BarChart2 } from "lucide-react";
import { copyTicketToClipboard } from "@/utils/clipboard";
import { trackEvent } from "@/utils/analytics";
import { motion } from "framer-motion"; // Ensure motion is imported

interface TicketCardProps {
  ticket: Ticket;
  index: number;
}

const TicketCard = ({ ticket, index }: TicketCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyTicketToClipboard(ticket.numbers, ticket.stars);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const text = `Mijn Lucky Engine EuroMillions Ticket: Nummers ${ticket.numbers.join(', ')} + Sterren ${ticket.stars.join(', ')}. Kans-score: ${ticket.chancePercentage}%`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lucky Engine Ticket',
          text: text,
          url: window.location.href,
        });
        trackEvent("Ticket Shared", { method: "WebShare" });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-card border border-border/20 overflow-hidden rounded-lg shadow-lg hover:border-emerald/30 transition-colors duration-300"
        style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 1px 5px rgba(0,0,0,0.1)' }} 
      >
        <CardContent className="p-3 sm:p-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto"> {/* Added w-full for mobile stacking */}
              <span className="text-[9px] font-bold uppercase tracking-extra-wide text-muted-foreground text-small-caps">
                Ticket {index + 1}
              </span>
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center sm:justify-start"> {/* Added flex-wrap and justify-center */}
                {ticket.numbers.map((n, i) => (
                  <Link key={`n-${i}`} to={`/nummers/${n}`} title={`Analyseer nummer ${n}`}>
                    <Ball value={n} delay={0} />
                  </Link>
                ))}
                <div className="w-px h-6 bg-border/50 mx-1 hidden sm:block" />
                {ticket.stars.map((s, i) => (
                  <Link key={`s-${i}`} to={`/sterren/${s}`} title={`Analyseer ster ${s}`}>
                    <Ball value={s} variant="star" delay={0} />
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto"> {/* Centered buttons on mobile */}
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald bg-emerald/10 px-2 py-1 rounded-full border border-emerald/20" title="Algoritmische Waarschijnlijkheidsscore">
                <TrendingUp size={12} />
                <span>{ticket.chancePercentage}%</span>
              </div>
              
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-8 h-8 hover:bg-card/50 text-secondary-foreground hover:text-emerald transition-colors duration-120"
                  onClick={handleCopy}
                  aria-label="Kopieer ticket"
                >
                  {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-8 h-8 hover:bg-card/50 text-secondary-foreground hover:text-blue-400 transition-colors duration-120"
                  onClick={handleShare}
                  aria-label="Deel ticket"
                >
                  <Share2 size={14} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Math Proof / Flags Section */}
          {ticket.flags && ticket.flags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border/10 justify-center sm:justify-start"> {/* Centered flags on mobile */}
              <span className="flex items-center text-[9px] text-muted-foreground mr-1">
                <ShieldCheck size={10} className="mr-1" /> Validatie:
              </span>
              {ticket.flags.map((flag, i) => (
                <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-sm bg-secondary/30 text-secondary-foreground border border-border/20">
                  {flag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TicketCard;