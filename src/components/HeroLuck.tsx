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
        compact ? "py-8 md:py-12" : "py-16 md:py-24" // Reduced bottom padding slightly to fit the larger logo better
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Increased max-width and reduced gap to bring elements closer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 items-center relative z-10">
        
        {/* Text Column - Added z-index to ensure it stays on top of any logo overlap */}
        <div className="text-center lg:text-left space-y-6 md:space-y-8 z-20 relative order-2 lg:order-1">
          
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className={cn("font-black tracking-tighter leading-none text-foreground", compact ? "text-4xl md:text-5xl" : "text-4xl sm:text-5xl md:text-7xl lg:text-8xl")}> {/* Adjusted H1 size for mobile */}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-100 to-gray-400 drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                  MAXIMALISEER JOUW
                </span>
              </span>
              <br />
              <span className="relative inline-block mt-2">
                {/* Glow effect behind text */}
                <span className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full opacity-40 animate-pulse"></span>
                {/* House Style Gradient: Emerald -> Gold -> Emerald */}
                <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-gold to-emerald-500 bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_25px_rgba(0,200,83,0.3)]">
                  WINNENDE POTENTIEEL.
                </span>
              </span>
            </h1>
            
            <p className={cn("font-medium text-muted-foreground uppercase tracking-widest text-small-caps", compact ? "text-xs" : "text-sm md:text-base")}>
              Aangedreven door <span className="text-emerald font-bold border-b border-emerald/30 pb-0.5">Lucky Engine Statistiek</span> & <span className="text-gold font-bold border-b border-gold/30 pb-0.5">Wiskundige Precisie</span>
            </p>
          </motion.div>
          
          {!compact && (
            <motion.p variants={itemVariants} className="text-base md:text-xl text-secondary-foreground leading-relaxed max-w-md md:max-w-none mx-auto md:mx-0"> {/* Adjusted P size for mobile */}
              Benut de kracht van frequentie-analyse en slimme algoritmen. Speel niet zomaar mee, speel met een strategie.
            </motion.p>
          )}

          <motion.div variants={itemVariants} className={cn("flex flex-col sm:flex-row justify-center lg:justify-start gap-4", compact ? "pt-2" : "pt-8")}>
            <Button
              onClick={handleGenerateClick}
              className="w-full sm:w-auto bg-emerald hover:bg-emerald-hover text-primary-foreground font-bold py-4 px-6 sm:py-7 sm:px-8 rounded-md text-base sm:text-lg emerald-glow transition-all duration-120 active:scale-[0.98] relative overflow-hidden group"
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
                className="w-full sm:w-auto border-border/20 text-secondary-foreground hover:bg-card/50 hover:text-foreground font-semibold py-4 px-6 sm:py-7 sm:px-8 rounded-md text-base sm:text-lg transition-colors duration-120"
              >
                Hoe het werkt
              </Button>
            )}
          </motion.div>
          <motion.p variants={itemVariants} className="text-[10px] md:text-xs text-muted-foreground/60 mt-4">
            *Geen garantie op winst. Onafhankelijke trekkingen. Speel verantwoord (18+).
          </motion.p>
        </div>

        {/* Logo Column - Order changed for mobile to put text first, but layout adjusted for larger screens */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center lg:justify-start relative order-1 lg:order-2 lg:-ml-12" // Negative margin to pull logo closer to text
        >
          {/* Dynamic Gold/Yellow Glow Effect */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gold/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen" 
            style={{
              animation: 'pulse-slow 4s ease-in-out infinite alternate'
            }}
          />
          
          {/* Floating Animation Wrapper */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <Logo
              imgClassName={cn(
                "w-auto relative drop-shadow-[0_0_35px_rgba(198,169,95,0.5)] transition-transform duration-500", 
                compact ? "h-40 md:h-64" : "h-64 sm:h-80 md:h-96 lg:h-[500px]" // Significantly adjusted sizes for mobile
              )}
              alt="Lucky Engine - Statistische EuroMillions Analyse en Ticket Generator"
              ariaLabel="Lucky Engine Logo - Startpagina voor EuroMillions Voorspellingen"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* CSS for custom slow pulse */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-slow {
          0% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
        }
      `}} />
    </motion.section>
  );
};

export default HeroLuck;