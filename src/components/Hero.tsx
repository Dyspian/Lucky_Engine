"use client";

import React from 'react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 text-center px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Lucky Engine
        </h1>
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