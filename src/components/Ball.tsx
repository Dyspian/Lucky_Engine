"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BallProps {
  value: number;
  variant?: 'number' | 'star';
  delay?: number;
}

const Ball = ({ value, variant = 'number', delay = 0 }: BallProps) => {
  const isStar = variant === 'star';
  
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 6 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: delay,
        duration: 0.4
      }}
      className={cn(
        "flex items-center justify-center font-bold select-none transition-transform duration-120",
        isStar 
          ? "w-7 h-7 text-xs sm:w-8 sm:h-8 sm:text-sm bg-gradient-to-br from-gold-depth to-gold text-foreground rounded-md rotate-45 relative overflow-hidden border border-gold/50 shadow-inner shadow-gold/30" 
          : "w-9 h-9 text-sm sm:w-10 sm:h-10 sm:text-base bg-gradient-to-br from-card to-background text-foreground rounded-full relative overflow-hidden border border-border/50 shadow-inner shadow-background/30"
      )}
      style={{
        boxShadow: isStar 
          ? 'inset 0 2px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)' // Deeper inset for stars
          : 'inset 0 2px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.2)', // Deeper inset for numbers
      }}
    >
      {/* Subtle radial highlight - more complex */}
      <div className={cn(
        "absolute inset-0",
        isStar ? "rounded-md" : "rounded-full",
        "bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-60" // Stronger highlight
      )} />
      <span className={cn(isStar && "-rotate-45 text-foreground")}>
        {value}
      </span>
    </motion.div>
  );
};

export default Ball;