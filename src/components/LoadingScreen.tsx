"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const LoadingScreen = () => {
  const loadingTexts = [
    "Historische trekkingen analyseren...",
    "Getalfrequenties berekenen...",
    "Recente prestaties wegen...",
    "De Lucky Engine kalibreren...",
  ];

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const logoUrl = "https://jxysvqcivgshyhkquoib.supabase.co/storage/v1/object/public/logo/lucky_engine.png"; 

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Logo imgClassName="h-24" imageUrl={logoUrl} alt="Lucky Engine Laadlogo" ariaLabel="Lucky Engine Laadscherm Logo" />
      </motion.div>

      <div className="w-64 h-1 bg-border/50 rounded-full mt-12 mb-6 overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 h-full w-1/3 bg-emerald emerald-glow rounded-full"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-sm text-muted-foreground tracking-wider"
        >
          {loadingTexts[index]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;