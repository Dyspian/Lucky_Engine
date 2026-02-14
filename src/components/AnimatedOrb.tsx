"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface AnimatedOrbProps {
  className?: string;
}

const AnimatedOrb = ({ className }: AnimatedOrbProps) => {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-2xl opacity-70",
        "bg-gradient-to-br from-primary/30 to-indigo-700/30", // Using existing colors for a soft gradient
        className
      )}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.7, 0.8, 0.7],
        rotate: [0, 10, 0]
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  );
};

export default AnimatedOrb;