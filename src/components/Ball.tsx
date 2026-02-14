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
          ? "w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-gold-depth to-gold text-primary-foreground rounded-md rotate-45 relative overflow-hidden border border-gold/50 shadow-inner shadow-gold/30 text-sm sm:text-base" 
          : "w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-card to-background text-foreground rounded-full relative overflow-hidden border border-border/50 shadow-inner shadow-background/30 text-base sm:text-lg"
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
      <span className={cn(isStar && "-rotate-45 text-primary-foreground")}>
        {value}
      </span>
    </motion.div>
  );
};

export default Ball;