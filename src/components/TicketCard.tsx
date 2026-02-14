"use client";

import React from 'react';
import { Ticket } from "@/lib/generator";
import Ball from "./Ball";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface TicketCardProps {
  ticket: Ticket;
  index: number;
}

const TicketCard = ({ ticket, index }: TicketCardProps) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden border-none bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 mr-2">
                Ticket #{index + 1}
              </span>
              <div className="flex gap-2">
                {ticket.numbers.map((n, i) => (
                  <Ball key={`n-${i}`} value={n} delay={index * 0.1 + i * 0.05} />
                ))}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="h-8 w-px bg-slate-200 hidden sm:block mx-2" />
              <div className="flex gap-2">
                {ticket.stars.map((s, i) => (
                  <Ball key={`s-${i}`} value={s} variant="star" delay={index * 0.1 + 0.3 + i * 0.05} />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TicketCard;