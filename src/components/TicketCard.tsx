"use client";

import React from 'react';
import { Ticket } from "@/lib/generator";
import Ball from "./Ball";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, TrendingUp } from "lucide-react"; // Added TrendingUp icon
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
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="glass-panel overflow-hidden group">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Ticket {index + 1}
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                {ticket.numbers.map((n, i) => (
                  <Ball key={`n-${i}`} value={n} delay={index * 0.05 + i * 0.03} />
                ))}
                <div className="w-px h-8 bg-white/10 mx-2 hidden sm:block" />
                {ticket.stars.map((s, i) => (
                  <Ball key={`s-${i}`} value={s} variant="star" delay={index * 0.05 + 0.2 + i * 0.03} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm font-semibold text-primary">
                <TrendingUp size={16} />
                <span>{ticket.chancePercentage}%</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/5 text-muted-foreground hover:text-primary transition-colors"
                onClick={handleCopy}
                aria-label="Kopieer ticket"
              >
                {copied ? <Check size={18} className="text-primary" /> : <Copy size={18} />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TicketCard;