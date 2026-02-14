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
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: delay 
      }}
      className={cn(
        "flex items-center justify-center font-bold shadow-lg select-none",
        isStar 
          ? "w-10 h-10 bg-amber-400 text-amber-950 rounded-lg rotate-45" 
          : "w-12 h-12 bg-indigo-600 text-white rounded-full"
      )}
    >
      <span className={cn(isStar && "-rotate-45")}>
        {value}
      </span>
    </motion.div>
  );
};

export default Ball;