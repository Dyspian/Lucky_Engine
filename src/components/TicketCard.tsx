"use client";

import React from 'react';
import { Ticket } from "@/lib/generator";
import Ball from "./Ball";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, TrendingUp } from "lucide-react";
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
      <Card className="bg-card border border-border/20 overflow-hidden rounded-lg shadow-lg transition-all duration-120 hover:border-emerald/50 hover:-translate-y-1">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <span className="text-[10px] font-bold uppercase tracking-extra-wide text-muted-foreground">
                Ticket {index + 1}
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                {ticket.numbers.map((n, i) => (
                  <Ball key={`n-${i}`} value={n} delay={index * 0.05 + i * 0.03} />
                ))}
                <div className="w-px h-8 bg-border/50 mx-2 hidden sm:block" />
                {ticket.stars.map((s, i) => (
                  <Ball key={`s-${i}`} value={s} variant="star" delay={index * 0.05 + 0.2 + i * 0.03} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm font-semibold text-emerald">
                <TrendingUp size={16} />
                <span>{ticket.chancePercentage}%</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-card/50 text-secondary-foreground hover:text-emerald transition-colors duration-120"
                onClick={handleCopy}
                aria-label="Kopieer ticket"
              >
                {copied ? <Check size={18} className="text-emerald" /> : <Copy size={18} />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TicketCard;