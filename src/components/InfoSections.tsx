"use client";

import React from 'react';
import { Info, AlertTriangle, CheckCircle2 } from "lucide-react";

export const ExplanationSection = () => {
  const points = [
    { title: "Historical Frequency", desc: "Analyzes the occurrence rate of each number within the selected time period." },
    { title: "Recency Weighting", desc: "Applies additional mathematical weight to numbers appearing in the most recent draws." },
    { title: "Weighted Randomization", desc: "Uses a temperature-smoothed algorithm to bias selection toward high-score candidates." },
    { title: "Independent Draws", desc: "Maintains the integrity of the system by acknowledging that each draw is a unique event." }
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shadow-md"> {/* Increased size and added shadow */}
          <Info size={20} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">How the Engine Works</h2> {/* Ensured text is white */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {points.map((p, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-2 shadow-lg"> {/* Added rounded-2xl and shadow */}
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 size={16} />
              <h3 className="font-bold text-sm uppercase tracking-wider">{p.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const DisclaimerSection = () => {
  return (
    <section className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4 shadow-lg"> {/* Added rounded-2xl and shadow */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <AlertTriangle size={16} className="text-primary" /> {/* Added primary color to icon */}
        <h2 className="text-xs font-bold uppercase tracking-[0.2em]">Legal Disclaimer</h2>
      </div>
      <div className="space-y-3 text-xs text-muted-foreground/80 leading-relaxed font-medium"> {/* Adjusted opacity for better readability */}
        <p>
          Lucky Engine is a statistical analysis tool provided for informational and entertainment purposes only. 
          The generated numbers are based on historical frequency patterns and do not guarantee a winning outcome.
        </p>
        <p>
          EuroMillions draws are independent events governed by random chance. Past performance is not an indicator of future results. 
          We are not affiliated with any official lottery operator.
        </p>
        <p className="text-muted-foreground/90"> {/* Adjusted opacity for better readability */}
          Please play responsibly. If you or someone you know has a gambling problem, please seek professional assistance.
        </p>
      </div>
    </section>
  );
};