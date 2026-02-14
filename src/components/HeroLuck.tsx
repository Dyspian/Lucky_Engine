"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Sparkles } from 'lucide-react';

interface HeroLuckProps {
  onGenerateClick: () => void;
  onHowItWorksClick: () => void;
}

const HeroLuck = ({ onGenerateClick, onHowItWorksClick }: HeroLuckProps) => {
  const logoUrl = "https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/lucky_engine.png";

  const handleGenerateClick = () => {
    onGenerateClick();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.section
      className="relative py-20 md:py-32 px-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
        <motion.div variants={itemVariants}>
          <Logo
            imageUrl={logoUrl}
            imgClassName="h-64 md:h-80 mx-auto mb-4" // Further increased logo size
            alt="Lucky Engine - Statistical EuroMillions Analysis and Ticket Generator"
            ariaLabel="Lucky Engine Logo - Home Page for EuroMillions Predictions"
          />
        </motion.div>
        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Find your luck — <br className="hidden md:inline"/>powered by transparent statistics.
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-indigo-200/80 leading-relaxed max-w-md mx-auto">
          Our engine analyzes historical EuroMillions data, applying weighted frequency and recency algorithms to identify mathematical trends.
        </motion.p>
        <motion.div variants={itemVariants} className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={handleGenerateClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-7 px-8 rounded-xl text-lg gold-glow transition-all active:scale-[0.98] relative overflow-hidden group"
          >
            <Sparkles className="absolute -top-2 -left-2 w-8 h-8 text-white/20 group-hover:rotate-180 transition-transform duration-700" />
            GENERATE LUCKY TICKETS
            <Sparkles className="absolute -bottom-2 -right-2 w-8 h-8 text-white/20 group-hover:rotate-180 transition-transform duration-700" />
          </Button>
          <Button
            onClick={onHowItWorksClick}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold py-7 px-8 rounded-xl text-lg transition-colors"
          >
            How it works
          </Button>
        </motion.div>
        <motion.p variants={itemVariants} className="text-xs text-indigo-300/60 mt-4">
          No guarantee. Independent draws. Free tool.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default HeroLuck;