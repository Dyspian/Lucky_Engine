"use client";

import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchDraws, Draw } from "@/lib/euromillions-provider";
import { cache } from "@/lib/cache";
import { buildStats } from "@/lib/stats-engine";
import { generateTickets, GenerateConfig, Ticket } from "@/lib/generator";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import GeneratorPanel from "@/components/GeneratorPanel";
import TicketCard from "@/components/TicketCard";
import { ExplanationSection, DisclaimerSection } from "@/components/InfoSections";
import { showSuccess, showError } from "@/utils/toast";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from '@/components/LoadingScreen';

const CACHE_KEY = "draws:v1";
const TTL_12H = 12 * 60 * 60 * 1000;

const Index = () => {
  const [results, setResults] = useState<{ tickets: Ticket[], explanation: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: drawsData, isLoading: isDataLoading } = useQuery({
    queryKey: [CACHE_KEY],
    queryFn: async () => {
      const cached = cache.get<Draw[]>(CACHE_KEY);
      if (cached.source === "cache") return cached.value!;
      const draws = await fetchDraws();
      cache.set(CACHE_KEY, draws, TTL_12H);
      return draws;
    },
    staleTime: TTL_12H,
  });

  const handleGenerate = async (config: GenerateConfig) => {
    if (!drawsData) {
      showError("Data layer not ready. Please wait.");
      return;
    }

    setIsGenerating(true);
    
    // Simulate network delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const stats = buildStats(drawsData, config);
      const { tickets } = generateTickets(stats, config);
      
      setResults({
        tickets,
        explanation: stats.explanation
      });
      
      showSuccess(`${tickets.length} tickets generated successfully.`);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      showError("Generation failed. Please check settings.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isDataLoading && !drawsData && <LoadingScreen />}
      </AnimatePresence>

      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <Navbar />
        
        <main className="container mx-auto px-4 pb-24">
          <Hero />
          
          <div className="max-w-4xl mx-auto space-y-24">
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 sticky top-24">
                <GeneratorPanel onGenerate={handleGenerate} isLoading={isGenerating || isDataLoading} />
              </div>
              
              <div className="lg:col-span-7 space-y-8 min-h-[400px]" id="results">
                <AnimatePresence mode="wait">
                  {results ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between px-2">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Generated Results
                        </h2>
                        <span className="text-[10px] font-medium text-primary/60 italic">
                          Weighted by statistical score
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {results.tickets.map((ticket, i) => (
                          <TicketCard key={i} ticket={ticket} index={i} />
                        ))}
                      </div>

                      <div className="p-6 rounded-2xl bg-primary/[0.03] border border-primary/10">
                        <p className="text-xs text-primary/80 leading-relaxed font-medium italic">
                          {results.explanation}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20 py-20">
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-muted-foreground" />
                      <p className="text-sm font-medium uppercase tracking-widest">Awaiting Configuration</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <ExplanationSection />
            
            <DisclaimerSection />
          </div>
        </main>

        <footer className="py-12 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
            © 2024 Lucky Engine • Analytical Systems Division
          </p>
        </footer>
      </div>
    </>
  );
};

export default Index;