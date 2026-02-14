"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Sparkles } from 'lucide-react';
import { trackEvent } from "@/utils/analytics"; // Import trackEvent

interface HeroLuckProps {
  onGenerateClick: () => void;
  onHowItWorksClick: () => void;
}

const HeroLuck = ({ onGenerateClick, onHowItWorksClick }: HeroLuckProps) => {
  const handleGenerateClick = () => {
    trackEvent("Hero Generate Button Clicked"); // Track event
    onGenerateClick();
  };

  const handleHowItWorksClick = () => {
    trackEvent("Hero How It Works Button Clicked"); // Track event
    onHowItWorksClick();
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.section
      className="relative py-20 md:py-32 px-6 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-center md:text-left space-y-6">
          <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold tracking-extra-wide text-foreground leading-tight">
            Vind je geluk — <br className="hidden md:inline"/>aangedreven door <span className="text-emerald">transparante statistieken</span>.
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-secondary-foreground leading-relaxed max-w-md md:max-w-none mx-auto md:mx-0">
            Onze engine analyseert historische EuroMillions-gegevens en past gewogen frequentie- en recentheidsalgoritmen toe om wiskundige trends te identificeren.
          </motion.p>
          <motion.div variants={itemVariants} className="pt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Button
              onClick={handleGenerateClick}
              className="bg-emerald hover:bg-emerald-hover text-primary-foreground font-bold py-7 px-8 rounded-md text-lg emerald-glow transition-all duration-120 active:scale-[0.98] relative overflow-hidden group"
              style={{ boxShadow: '0 4px 15px rgba(0, 200, 83, 0.4), 0 1px 5px rgba(0, 200, 83, 0.2)' }}
            >
              <Sparkles className="absolute -top-2 -left-2 w-8 h-8 text-white/20 group-hover:rotate-180 transition-transform duration-700" />
              GENEREER GELUKSTICKETEN
              <Sparkles className="absolute -bottom-2 -right-2 w-8 h-8 text-white/20 group-hover:rotate-180 transition-transform duration-700" />
            </Button>
            <Button
              onClick={handleHowItWorksClick}
              variant="outline"
              className="border-border/20 text-secondary-foreground hover:bg-card/50 hover:text-foreground font-semibold py-7 px-8 rounded-md text-lg transition-colors duration-120"
            >
              Hoe het werkt
            </Button>
          </motion.div>
          <motion.p variants={itemVariants} className="text-xs text-muted-foreground mt-4">
            Geen garantie. Onafhankelijke trekkingen. Gratis tool.
          </motion.p>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex justify-center md:justify-end relative"
        >
          <Logo
            imgClassName="h-64 md:h-80 w-auto"
            alt="Lucky Engine - Statistische EuroMillions Analyse en Ticket Generator"
            ariaLabel="Lucky Engine Logo - Startpagina voor EuroMillions Voorspellingen"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroLuck;