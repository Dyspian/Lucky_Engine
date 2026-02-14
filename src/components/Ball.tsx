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
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 25,
        delay: delay 
      }}
      className={cn(
        "flex items-center justify-center font-bold select-none transition-transform hover:scale-110",
        isStar 
          ? "w-9 h-9 bg-primary text-primary-foreground rounded-lg rotate-45 gold-glow" 
          : "w-11 h-11 bg-secondary border border-white/10 text-white rounded-full"
      )}
    >
      <span className={cn(isStar && "-rotate-45")}>
        {value}
      </span>
    </motion.div>
  );
};

export default Ball;