"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { Sparkles } from 'lucide-react';
import { trackEvent } from "@/utils/analytics"; // Import trackEvent
import { cn } from "@/lib/utils";

interface HeroLuckProps {
  onGenerateClick: () => void;
  onHowItWorksClick: () => void;
  compact?: boolean;
}

const HeroLuck = ({ onGenerateClick, onHowItWorksClick, compact = false }: HeroLuckProps) => {
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
      className={cn(
        "relative px-6 overflow-hidden transition-all",
        compact ? "py-8 md:py-12" : "py-16 md:py-32"
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        <div className="text-center md:text-left space-y-6 md:space-y-8">
          
          {/* Enhanced Header Text */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className={cn("font-black tracking-tighter leading-none text-foreground", compact ? "text-4xl md:text-5xl" : "text-5xl md:text-7xl")}>
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                  Vind je
                </span>
              </span>
              <br />
              <span className="relative inline-block mt-1">
                {/* Glow effect behind text */}
                <span className="absolute -inset-2 bg-emerald-500/20 blur-xl rounded-full opacity-50"></span>
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  GELUK.
                </span>
              </span>
            </h1>
            
            <p className={cn("font-medium text-muted-foreground uppercase tracking-widest text-small-caps", compact ? "text-xs" : "text-sm md:text-base")}>
              Aangedreven door <span className="text-emerald-400 font-bold border-b border-emerald-500/30 pb-0.5">Transparante Statistiek</span>
            </p>
          </motion.div>
          
          {!compact && (
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-secondary-foreground leading-relaxed max-w-md md:max-w-none mx-auto md:mx-0">
              Onze engine analyseert historische EuroMillions-gegevens en past gewogen frequentie- en recentheidsalgoritmen toe om wiskundige trends te identificeren.
            </motion.p>
          )}

          <motion.div variants={itemVariants} className={cn("flex flex-col sm:flex-row justify-center md:justify-start gap-4", compact ? "pt-2" : "pt-6")}>
            <Button
              onClick={handleGenerateClick}
              className="bg-emerald hover:bg-emerald-hover text-primary-foreground font-bold py-4 px-6 sm:py-7 sm:px-8 rounded-md text-base sm:text-lg emerald-glow transition-all duration-120 active:scale-[0.98] relative overflow-hidden group"
              style={{ boxShadow: '0 4px 20px rgba(0, 200, 83, 0.4), 0 1px 5px rgba(0, 200, 83, 0.2)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              <Sparkles className="absolute -top-2 -left-2 w-8 h-8 text-white/20 group-hover:rotate-180 transition-transform duration-700" />
              GENEREER TICKETS
              <Sparkles className="absolute -bottom-2 -right-2 w-8 h-8 text-white/20 group-hover:rotate-180 transition-transform duration-700" />
            </Button>
            
            {!compact && (
              <Button
                onClick={handleHowItWorksClick}
                variant="outline"
                className="border-border/20 text-secondary-foreground hover:bg-card/50 hover:text-foreground font-semibold py-4 px-6 sm:py-7 sm:px-8 rounded-md text-base sm:text-lg transition-colors duration-120"
              >
                Hoe het werkt
              </Button>
            )}
          </motion.div>
          <motion.p variants={itemVariants} className="text-[10px] md:text-xs text-muted-foreground/60 mt-4">
            *Geen garantie. Onafhankelijke trekkingen. Speel verantwoord (18+).
          </motion.p>
        </div>

        <motion.div 
          variants={itemVariants}
          className="flex justify-center md:justify-end relative"
        >
          {/* Subtle glow behind logo */}
          <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full scale-75" />
          <Logo
            imgClassName={cn("w-auto relative z-10 drop-shadow-2xl", compact ? "h-32 md:h-48" : "h-64 md:h-80")}
            alt="Lucky Engine - Statistische EuroMillions Analyse en Ticket Generator"
            ariaLabel="Lucky Engine Logo - Startpagina voor EuroMillions Voorspellingen"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroLuck;