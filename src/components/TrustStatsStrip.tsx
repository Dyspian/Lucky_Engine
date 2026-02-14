"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, ShieldCheck, Lightbulb, TrendingUp } from 'lucide-react';

const trustFacts = [
  {
    icon: <BarChart2 size={20} className="text-emerald" />,
    title: "Historische Trekking Gegevens",
    description: "Gebruik van uitgebreide eerdere resultaten voor analyse."
  },
  {
    icon: <TrendingUp size={20} className="text-emerald" />,
    title: "Frequentie + Recentheid",
    description: "Gewogen algoritmen identificeren opkomende patronen."
  },
  {
    icon: <Lightbulb size={20} className="text-emerald" />,
    title: "Transparante Methodologie",
    description: "Duidelijke inzichten in hoe getallen worden gegenereerd."
  },
  {
    icon: <ShieldCheck size={20} className="text-emerald" />,
    title: "Geen Garanties",
    description: "Puur statistisch, onafhankelijke trekkingen. Speel verantwoord."
  },
];

const TrustStatsStrip = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      className="container mx-auto px-6 py-16 md:py-24 -mt-20 relative z-20" // Overlapping effect
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trustFacts.map((fact, i) => (
          <motion.div
            key={i}
            className="bg-card border border-border/20 p-6 rounded-lg flex flex-col items-center text-center space-y-3 shadow-lg transition-all duration-120 hover:border-emerald/50 hover:shadow-emerald-glow hover:-translate-y-1"
            variants={itemVariants}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-depth flex items-center justify-center mb-2">
              {fact.icon}
            </div>
            <h3 className="text-lg font-bold text-foreground tracking-wide">{fact.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{fact.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TrustStatsStrip;