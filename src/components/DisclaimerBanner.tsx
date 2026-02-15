"use client";

import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DisclaimerBanner = () => {
  const content = (
    <div className="flex items-center gap-6 md:gap-12 px-4">
      <span className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-wider text-emerald-400/90 whitespace-nowrap">
        <AlertTriangle size={14} className="text-gold" />
        Disclaimer: Lucky Engine is een onafhankelijke statistiek tool.
      </span>
      <span className="text-[10px] md:text-xs font-medium text-secondary-foreground/80 whitespace-nowrap">
        Wij zijn <strong>niet</strong> verbonden met de officiële Nationale Loterij.
      </span>
      <a 
        href="https://www.nationale-loterij.be/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-[10px] md:text-xs font-bold text-emerald-400 hover:text-gold transition-colors underline decoration-emerald-500/30 underline-offset-2 whitespace-nowrap"
      >
        Bezoek de officiële website (nationale-loterij.be)
      </a>
      <span className="text-emerald-500/20 px-2">•</span>
    </div>
  );

  return (
    <div className="bg-background/95 border-b border-border/20 overflow-hidden relative z-[60] h-9 flex items-center backdrop-blur-md">
      {/* Gradient fades for the edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  );
};

export default DisclaimerBanner;