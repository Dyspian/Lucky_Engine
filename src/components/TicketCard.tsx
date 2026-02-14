"use client";

import React from 'react';
import { Ticket } from "@/lib/generator";
import Ball from "./Ball";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, TrendingUp, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { copyTicketToClipboard } from "@/utils/clipboard";
import { useState } from "react";

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

  return (
    <motion.div
      initial={{ y: 6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card className="bg-card border border-border/20 overflow-hidden rounded-lg shadow-lg transition-all duration-120 hover:border-emerald/50 hover:-translate-y-1"
        style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3), 0 1px 5px rgba(0,0,0,0.1)' }} 
      >
        <CardContent className="p-3 sm:p-4 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="text-[9px] font-bold uppercase tracking-extra-wide text-muted-foreground text-small-caps">
                Ticket {index + 1}
              </span>
              <div className="flex items-center gap-1 sm:gap-2">
                {ticket.numbers.map((n, i) => (
                  <Ball key={`n-${i}`} value={n} delay={index * 0.05 + i * 0.03} />
                ))}
                <div className="w-px h-6 bg-border/50 mx-1 hidden sm:block" />
                {ticket.stars.map((s, i) => (
                  <Ball key={`s-${i}`} value={s} variant="star" delay={index * 0.05 + 0.2 + i * 0.03} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald bg-emerald/10 px-2 py-1 rounded-full border border-emerald/20">
                <TrendingUp size={12} />
                <span>{ticket.chancePercentage}% Score</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-8 h-8 hover:bg-card/50 text-secondary-foreground hover:text-emerald transition-colors duration-120"
                onClick={handleCopy}
                aria-label="Kopieer ticket"
              >
                {copied ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
              </Button>
            </div>
          </div>
          
          {/* Math Proof / Flags Section */}
          {ticket.flags && ticket.flags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border/10">
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