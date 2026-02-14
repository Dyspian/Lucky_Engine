"use client";

import React from 'react';
import Logo from './Logo'; // Import the Logo component

const Hero = () => {
  const logoUrl = "https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/lucky_engine.png";

  return (
    <section className="py-16 md:py-24 text-center px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Replaced h1 with Logo component for the main hero image */}
        <Logo 
          imageUrl={logoUrl} 
          imgClassName="h-24 md:h-32 mx-auto" // Center the logo and adjust size
          alt="Lucky Engine - Statistical EuroMillions Analysis and Ticket Generator" 
          ariaLabel="Lucky Engine Logo - Home Page for EuroMillions Predictions" 
        />
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Statistical EuroMillions analysis based on historical draw data. 
          Our engine utilizes weighted frequency and recency algorithms to identify mathematical trends.
        </p>
        <div className="pt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            No guarantee • Independent draw system
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;