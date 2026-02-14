"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, ShieldCheck, Lightbulb, TrendingUp } from 'lucide-react';

const trustFacts = [
  {
    icon: <BarChart2 size={20} className="text-primary" />,
    title: "Historical Draw Data",
    description: "Leveraging comprehensive past results for analysis."
  },
  {
    icon: <TrendingUp size={20} className="text-primary" />,
    title: "Frequency + Recency",
    description: "Weighted algorithms identify emerging patterns."
  },
  {
    icon: <Lightbulb size={20} className="text-primary" />,
    title: "Transparent Methodology",
    description: "Clear insights into how numbers are generated."
  },
  {
    icon: <ShieldCheck size={20} className="text-primary" />,
    title: "No Guarantees",
    description: "Purely statistical, independent draws. Play responsibly."
  },
];

const TrustStatsStrip = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      className="container mx-auto px-4 py-16 md:py-24"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {trustFacts.map((fact, i) => (
          <motion.div
            key={i}
            className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center space-y-3 border-white/10 shadow-lg"
            variants={itemVariants}
            transition={{ delay: i * 0.1 }}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              {fact.icon}
            </div>
            <h3 className="text-lg font-bold text-white">{fact.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{fact.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TrustStatsStrip;