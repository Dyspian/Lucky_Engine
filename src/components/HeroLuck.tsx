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
    // Confetti effect moved to GeneratorPanel
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

  const cloverChipVariants = {
    initial: { y: 0, rotate: 0, opacity: 0.8 },
    animate: {
      y: [0, -5, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2
      }
    }
  };

  return (
    <motion.section
      className="relative py-20 md:py-32 px-4 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Title and CTA */}
        <div className="text-center lg:text-left space-y-6 relative z-10">
          <motion.div variants={itemVariants}>
            <Logo
              imageUrl={logoUrl}
              imgClassName="h-20 md:h-24 mx-auto lg:mx-0 mb-4"
              alt="Lucky Engine - Statistical EuroMillions Analysis and Ticket Generator"
              ariaLabel="Lucky Engine Logo - Home Page for EuroMillions Predictions"
            />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find your luck — <br className="hidden md:inline"/>powered by transparent statistics.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-indigo-200/80 leading-relaxed max-w-md mx-auto lg:mx-0">
            Our engine analyzes historical EuroMillions data, applying weighted frequency and recency algorithms to identify mathematical trends.
          </motion.p>
          <motion.div variants={itemVariants} className="pt-6 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
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

        {/* Right: Luck Core Visual */}
        <div className="relative flex items-center justify-center h-80 lg:h-auto min-h-[300px] z-0">
          <motion.div
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/30 to-indigo-700/30 blur-2xl opacity-70"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.8, 0.7],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-primary/50 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-indigo-900/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <Logo
                imageUrl={logoUrl}
                imgClassName="h-20 md:h-24 opacity-80"
                alt="Lucky Engine Core"
                ariaLabel="Lucky Engine Core Visual"
              />
            </div>
          </motion.div>

          {/* Floating Clover Chips */}
          {[...Array(5)].map((_, i) => (
            <motion.img
              key={i}
              src="/clover.svg"
              alt="Clover chip"
              className="absolute w-8 h-8 opacity-70"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 18}%`,
                filter: `drop-shadow(0 0 5px rgba(52, 211, 153, 0.5))`
              }}
              variants={cloverChipVariants}
              initial="initial"
              animate="animate"
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default HeroLuck;